# EmailJS Setup Guide

This guide will help you set up EmailJS to receive contact form submissions via email.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)

## Step 2: Create an Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (you'll need this)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template variables in your email:

```
Subject: New Contact Form Submission from {{from_name}}

Body:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Interested In: {{interest}}
Message: {{message}}
```

4. Set the **To Email** field to your admin email (e.g., Softwarespackers12@gmail.com)
5. Set the **From Name** to something like "Softwares Packers Website"
6. **Copy the Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** > **General**
2. Scroll down to **API Keys**
3. **Copy your Public Key**

## Step 5: Add Environment Variables

Create a `.env` file in the root of your project (if it doesn't exist) and add:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important:** 
- Never commit your `.env` file to git (it should already be in `.gitignore`)
- Restart your development server after adding these variables
- For production, add these as environment variables in your hosting platform

## Step 6: Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox for the form submission

## Troubleshooting

- **Emails not sending?** Check the browser console for errors
- **"EmailJS not configured" warning?** Make sure all three environment variables are set
- **Template variables not working?** Make sure the variable names in your EmailJS template match exactly: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{interest}}`, `{{message}}`

## Free Tier Limits

- 200 emails per month (free tier)
- Upgrade if you need more emails
