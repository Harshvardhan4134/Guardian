import React from 'react'
import { Shield, Twitter, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'AI Models', 'Pricing', 'Documentation', 'API Reference']
    },
    {
      title: 'Solutions',
      links: ['Content Moderation', 'Risk Assessment', 'Compliance', 'Enterprise', 'Government']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Contact', 'Support']
    }
  ]

  const socialIcons = [
    { icon: Twitter, href: '#' },
    { icon: Github, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Mail, href: '#' }
  ]

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Guardian AI</span>
            </div>
            <p className="mb-6 text-white/80">
              Real-time <span className="font-medium text-accent">AI</span> detection, enforcement, and audit intelligence
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 ease-out hover:bg-white/20"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-sm text-white/70 transition-colors duration-300 ease-out hover:text-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2026 Guardian AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-white/60 transition-colors duration-300 ease-out hover:text-accent">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-white/60 transition-colors duration-300 ease-out hover:text-accent">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-white/60 transition-colors duration-300 ease-out hover:text-accent">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer