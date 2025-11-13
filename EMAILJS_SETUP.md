# EmailJS Setup Guide

Your contact form is now ready to send emails directly without opening a mail client! Follow these steps to configure it:

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Connect your Gmail account (avi.guha05@gmail.com)
5. Copy your **Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Set up the template like this:

**Template Settings:**
- Template Name: `Portfolio Contact Form`
- Subject: `New message from {{from_name}}`
- Content (HTML):
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Copy your **Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Public Key
1. Go to "Account" → "General"
2. Find your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxx`)

## Step 5: Update Your Code
Open `src/components/Contact.tsx` and replace these placeholders:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your Service ID from Step 2
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID from Step 3
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_email: 'avi.guha05@gmail.com',
  },
  'YOUR_PUBLIC_KEY'      // Replace with your Public Key from Step 4
);
```

## Step 6: Test and Deploy
1. Save the changes
2. Commit and push:
```bash
git add src/components/Contact.tsx
git commit -m "Configure EmailJS for contact form"
git push
```

## How It Works
- Someone fills out your contact form
- They click "Send Message"
- EmailJS sends the message directly to avi.guha05@gmail.com
- They see a success message
- No mail client opens - it just works!

## Security Note
- Your EmailJS public key is safe to expose in client-side code
- EmailJS handles rate limiting and spam protection
- Free tier: 200 emails/month (upgrade if needed)

## Alternative: Formspree
If you prefer, you can also use Formspree (https://formspree.io/):
- Simpler setup (just one endpoint URL)
- No template configuration needed
- Also has a generous free tier

Let me know if you'd like me to switch to Formspree instead!
