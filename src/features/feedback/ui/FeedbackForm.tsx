import React, { useState } from 'react'
import { CheckCircle, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button, Input, Label, Textarea } from '@/shared/ui'

export const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formEl = e.currentTarget

      const encode = (data: Record<string, string>) =>
        Object.keys(data)
          .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&')

      const body = encode({
        'form-name': 'feedback-form',
        name: formData.name,
        email: formData.email,
        message: formData.message,
        'bot-field': '',
      })

      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })

      setIsSubmitted(true)
      toast.success('Thank you for your feedback!')

      // Clear form fields
      setFormData({ name: '', email: '', message: '' })
      // Optionally reset the <form> element as well
      formEl.reset()

      // Auto-hide submitted state after a moment
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-12 md:py-24 px-4 max-h-[260px] flex justify-center items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <CheckCircle className="w-12 h-12 text-green-800 mx-auto mb-4" />
            <h2 className="text-4xl md:text-4xl font-bold text-armenian-cream mb-4">Thank You!</h2>
            <p className="text-2xl text-armenian-cream/80">
              We've received your feedback and appreciate you taking the time to share your experience with us.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="text-armenian-cream">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          data-netlify="true"
          name="feedback-form"
          netlify-honeypot="bot-field"
          data-netlify-recaptcha="true"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="border-armenian-cream/20 focus:border-armenian-cream focus:ring-armenian-cream"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Your Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="border-armenian-cream/20 focus:border-armenian-cream focus:ring-armenian-cream"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-armenian-cream font-medium">
              Your Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Share your experience or suggestions..."
              value={formData.message}
              onChange={handleChange}
              className="border-armenian-cream/20 focus:border-armenian-cream focus:ring-armenian-cream min-h-32"
            />
          </div>

          <div data-netlify-recaptcha="true"></div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-armenian-red hover:bg-armenian-red/90 text-white px-8 py-3 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>

          <input type="hidden" name="form-name" value="feedback-form" />

          <p className="hidden">
            <label>Don’t fill this out if you’re human:</label>
            <input name="bot-field" />
          </p>
        </form>
      </div>
    </section>
  )
}
