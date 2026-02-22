import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { createPortal } from "react-dom";

type HistoryItem = {
    command: string;
    output: React.ReactNode;
};

const directories = [
    { name: "about", path: "/about", description: "Learn more about my background" },
    { name: "experience", path: "/experience", description: "Professional history" },
    { name: "projects", path: "/projects", description: "Engineering and software projects" },
    { name: "resume", path: "/resume", description: "View my resume" },
    { name: "contact", path: "/contact", description: "Get in touch" },
];

const Terminal = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [bootText, setBootText] = useState("");
    const [demoText, setDemoText] = useState("");
    const location = useLocation();

    // Open by default if on home page
    const [windowState, setWindowState] = useState<"closed" | "minimized" | "open" | "maximized">(
        location.pathname === '/' ? "open" : "minimized"
    );

    // Drag state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [hasDetached, setHasDetached] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    const [placeholderNode, setPlaceholderNode] = useState<Element | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const bootSequence = "Type 'help' for commands or 'ls' to list directories.\nPress Ctrl + ` to toggle the terminal.";

    // Global toggle shortcut
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "`") {
                e.preventDefault();
                setWindowState(prev => (prev === "closed" || prev === "minimized") ? "open" : "minimized");
            }
        };
        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, []);

    // Track placeholder node for portaling on home page
    useEffect(() => {
        if (location.pathname === '/') {
            const observer = new MutationObserver(() => {
                const n = document.getElementById('terminal-placeholder');
                if (n !== placeholderNode) {
                    setPlaceholderNode(n);
                }
            });
            const n = document.getElementById('terminal-placeholder');
            if (n) setPlaceholderNode(n);
            observer.observe(document.body, { childList: true, subtree: true });
            return () => observer.disconnect();
        } else {
            setPlaceholderNode(null);
        }
    }, [location.pathname]);

    // Force terminal open when arriving at the home page so there is no blank placeholder gap
    // Hide it when navigating away via navbar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (location.pathname === '/') {
            if (windowState !== 'open') setWindowState('open');
        } else {
            if (windowState === 'open') setWindowState('minimized');
        }
    }, [location.pathname]);

    // Typing animation on home screen
    useEffect(() => {
        if (location.pathname === '/' && history.length === 0) {

            const words = directories.map(d => `cd ${d.name}`);
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let timeoutId: NodeJS.Timeout;
            let isCancelled = false;

            const type = () => {
                if (isCancelled) return;
                const currentWord = words[wordIndex];

                if (isDeleting) {
                    charIndex--;
                    setDemoText(currentWord.substring(0, charIndex));
                } else {
                    charIndex++;
                    setDemoText(currentWord.substring(0, charIndex));
                }

                let typingSpeed = Math.random() * 50 + 50;
                if (isDeleting) {
                    typingSpeed /= 2;
                }

                if (!isDeleting && charIndex === currentWord.length) {
                    typingSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 3) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typingSpeed = 500;
                }

                timeoutId = setTimeout(type, typingSpeed);
            };

            timeoutId = setTimeout(type, 2000);

            return () => {
                isCancelled = true;
                clearTimeout(timeoutId);
            };
        } else {
            setDemoText("");
        }
    }, [location.pathname, history.length]);

    const isPortaled = !!placeholderNode && location.pathname === '/' && !hasDetached && windowState === 'open';

    // Dragging logic
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || windowState !== "open" || !containerRef.current) return;

            const newX = e.clientX - dragOffset.current.x;
            const newY = e.clientY - dragOffset.current.y;

            currentPos.current = { x: newX, y: newY };

            // Bypass React state to directly update the DOM for smooth 60fps dragging
            containerRef.current.style.transform = `translate(calc(-50% + ${newX}px), ${newY}px)`;
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            // Save the final position to React state when done dragging
            setPosition({ x: currentPos.current.x, y: currentPos.current.y });
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, windowState]);

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setBootText(bootSequence.substring(0, i));
            i++;
            if (i > bootSequence.length) {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 25);
        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        // Scroll to bottom when history changes
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history, bootText]);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        let output: React.ReactNode = null;

        if (!trimmedCmd) {
            // Empty command
        } else if (trimmedCmd.toLowerCase() === "help") {
            output = (
                <div className="text-muted-foreground mt-1 mb-2">
                    <div>Available commands:</div>
                    <div className="grid grid-cols-[80px_1fr] gap-2 mt-2">
                        <span className="text-accent font-semibold">ls</span> <span>List available sections</span>
                        <span className="text-accent font-semibold">cd <span className="text-muted-foreground">&lt;dir&gt;</span></span> <span>Navigate to a section</span>
                        <span className="text-accent font-semibold">clear</span> <span>Clear the terminal screen</span>
                        <span className="text-accent font-semibold">theme</span> <span>Toggle light/dark mode</span>
                        <span className="text-accent font-semibold">whoami</span> <span>Display current user info</span>
                        <span className="text-accent font-semibold">sudo</span> <span>???</span>
                    </div>
                    <div className="mt-3 italic opacity-80">Tip: You can also click on the glowing names to navigate.</div>
                </div>
            );
        } else if (trimmedCmd.toLowerCase() === "ls" || trimmedCmd.toLowerCase() === "dir") {
            output = (
                <div className="mt-1 mb-2 flex flex-col gap-1">
                    {directories.map((dir) => (
                        <div key={dir.name} className="flex items-center gap-3">
                            <span
                                className="text-accent hover:text-accent-hover font-semibold cursor-pointer underline decoration-accent/30 underline-offset-4 transition-colors"
                                onClick={() => navigate(dir.path)}
                            >
                                {dir.name}/
                            </span>
                            <span className="text-muted-foreground hidden sm:inline">- {dir.description}</span>
                        </div>
                    ))}
                </div>
            );
        } else if (trimmedCmd.toLowerCase().startsWith("cd ")) {
            const target = trimmedCmd.substring(3).trim();
            if (target === ".." || target === "..." || target === "~") {
                navigate("/");
                setWindowState("open");
                setHistory([]);
                return;
            } else {
                const dir = directories.find((d) => d.name.toLowerCase() === target.toLowerCase());
                if (dir) {
                    navigate(dir.path);
                    setWindowState("minimized");
                    output = <div className="text-accent mt-1 mb-2">Routing to {dir.name}...</div>;
                } else {
                    output = <div className="text-destructive mt-1 mb-2">cd: {target}: No such directory</div>;
                }
            }
        } else if (trimmedCmd.toLowerCase() === "clear") {
            setHistory([]);
            return; // Skip adding to history
        } else if (trimmedCmd.toLowerCase() === "theme" || trimmedCmd.toLowerCase() === "toggle theme") {
            const newTheme = theme === "dark" ? "light" : "dark";
            setTheme(newTheme);
            output = <div className="text-accent mt-1 mb-2">Switching to {newTheme} mode...</div>;
        } else if (trimmedCmd.toLowerCase() === "whoami") {
            output = <div className="text-muted-foreground mt-1 mb-2">guest@aviguha.github.io</div>;
        } else if (trimmedCmd.toLowerCase().startsWith("sudo ")) {
            output = <div className="text-destructive mt-1 mb-2">guest is not in the sudoers file. This incident will be reported.</div>;
        } else {
            output = <div className="text-destructive mt-1 mb-2">command not found: {trimmedCmd}</div>;
        }

        setHistory((prev) => [...prev, { command: trimmedCmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "Tab") {
            e.preventDefault();

            const trimmedInput = input.trimStart();
            const args = trimmedInput.split(/\s+/);
            const isCd = trimmedInput.toLowerCase().startsWith("cd ");
            const isSudo = trimmedInput.toLowerCase().startsWith("sudo ");

            if (!isCd && !isSudo && args.length <= 1) {
                const availableCommands = ["help", "ls", "dir", "cd", "clear", "theme", "whoami", "sudo"];
                const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
                if (matches.length === 1) {
                    setInput(matches[0] + (matches[0] === 'cd' || matches[0] === 'sudo' ? ' ' : ''));
                }
            } else if (isCd) {
                const dirInput = args.length > 1 ? args[1].toLowerCase() : "";
                const matches = directories.filter(dir => dir.name.toLowerCase().startsWith(dirInput));
                if (matches.length === 1) {
                    setInput(`cd ${matches[0].name}`);
                }
            }
        }
    };

    const isMaximized = windowState === "maximized";
    const isMinimized = windowState === "minimized";

    if (windowState === "closed" || isMinimized) return null;

    const handleTerminalClick = () => {
        if (isMinimized) {
            setWindowState("open");
        } else {
            focusInput();
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (windowState !== "open") return;
        setIsDragging(true);

        let startX = currentPos.current.x;
        let startY = currentPos.current.y;

        if (isPortaled && containerRef.current) {
            setHasDetached(true);
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate natural offset back to the center bottom-4
            startX = rect.left + rect.width / 2 - window.innerWidth / 2;
            startY = rect.top - (window.innerHeight - 16 - rect.height);
            setPosition({ x: startX, y: startY });
            currentPos.current = { x: startX, y: startY };
        }

        dragOffset.current = {
            x: e.clientX - startX,
            y: e.clientY - startY
        };
    };

    const terminalContent = (
        <div
            ref={containerRef}
            className={
                isPortaled
                    ? "w-full h-full rounded-xl shadow-2xl overflow-hidden font-mono text-sm sm:text-base text-left group border bg-[#0a0a0a] border-zinc-800"
                    : `fixed z-50 transition-all shadow-2xl overflow-hidden font-mono text-sm sm:text-base text-left group border bg-[#0a0a0a] border-zinc-800 hover:border-zinc-700 hover:shadow-accent/10
                    ${isMaximized
                        ? "bottom-0 left-0 right-0 top-0 w-full h-full rounded-none"
                        : isMinimized
                            ? "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl rounded-t-xl h-12 cursor-pointer hover:bg-[#111]"
                            : "bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl rounded-xl h-[400px]"
                    }
                    ${isDragging ? 'duration-0 cursor-grabbing' : 'duration-300'}
                `
            }
            style={
                isPortaled ? undefined : {
                    transform: windowState === "open" ? `translate(calc(-50% + ${position.x}px), ${position.y}px)` : undefined,
                    left: windowState === "open" ? "50%" : undefined
                }
            }
            onClick={handleTerminalClick}
        >
            {/* Terminal Header */}
            <div
                className={`bg-[#151515] border-b border-zinc-800 px-4 flex items-center justify-between select-none ${isMinimized ? 'h-full border-b-0' : 'py-3'} ${windowState === 'open' ? 'cursor-grab active:cursor-grabbing' : ''}`}
                onMouseDown={handleMouseDown}
            >
                <div className="flex gap-2">
                    <div
                        className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setWindowState("closed"); }}
                        title="Close"
                    ></div>
                    <div
                        className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:bg-yellow-400 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setWindowState("minimized"); }}
                        title="Minimize"
                    ></div>
                    <div
                        className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer hover:bg-green-400 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setWindowState(isMaximized ? "open" : "maximized"); }}
                        title="Maximize"
                    ></div>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold tracking-wider uppercase">
                    <TerminalIcon size={14} />
                    <span>guest@avi-guha:~</span>
                </div>
                <div className="w-12 text-xs text-zinc-600 opacity-60 text-right whitespace-nowrap">Ctrl+`</div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
                <div
                    ref={terminalRef}
                    className={`p-6 overflow-y-auto text-zinc-300 custom-scrollbar ${isMaximized ? 'h-[calc(100vh-48px)]' : 'h-[calc(400px-48px)]'}`}
                >
                    <div className="whitespace-pre-wrap text-zinc-400 mb-4 font-medium leading-relaxed">
                        {bootText}
                        {isTyping && <span className="animate-pulse inline-block w-2 h-4 bg-zinc-400 ml-1 align-middle" />}
                    </div>

                    {!isTyping && (
                        <div className="flex flex-col gap-1">
                            {history.map((item, i) => (
                                <div key={i}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-500">~</span>
                                        <ChevronRight size={14} className="text-zinc-500" />
                                        <span className="text-zinc-100">{item.command}</span>
                                    </div>
                                    {item.output}
                                </div>
                            ))}

                            <div className="flex items-center gap-2 mt-1 relative">
                                <span className="text-green-500 font-bold shrink-0">~</span>
                                <ChevronRight size={14} className="text-green-500 shrink-0" />
                                <div className="flex-1 relative flex items-center min-h-[24px]">
                                    {input === "" && demoText !== "" && (
                                        <div className="absolute inset-0 pointer-events-none text-zinc-500 flex items-center whitespace-pre">
                                            {demoText}
                                            <span className="w-2 h-4 bg-zinc-500 ml-1 animate-pulse" />
                                        </div>
                                    )}
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className={`w-full bg-transparent outline-none border-none ${input === "" && demoText !== "" ? "text-transparent caret-transparent" : "text-zinc-100 caret-zinc-100"} focus:ring-0`}
                                        spellCheck={false}
                                        autoComplete="off"
                                        autoFocus
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    if (isPortaled && placeholderNode) {
        return createPortal(terminalContent, placeholderNode);
    }

    return terminalContent;
};

export default Terminal;
