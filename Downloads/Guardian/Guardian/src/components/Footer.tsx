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
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Guardian AI</span>
            </div>
            <p className="text-white/80 mb-6">
              Real-time AI detection, enforcement, and audit intelligence
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-250"
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
                      className="text-white/70 hover:text-white transition-all duration-250 text-sm"
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
            <a href="#" className="text-white/60 hover:text-white text-sm transition-all duration-250">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-all duration-250">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-all duration-250">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer