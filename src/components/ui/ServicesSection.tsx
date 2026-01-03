import React from 'react'
import { ServiceItem, SiteSettings } from './types'
import { ServicesHeader } from './services/ServicesHeader'
import { ServicesList } from './services/ServicesList'

interface ServicesSectionProps {
  siteSettings: SiteSettings
  services?: ServiceItem[]
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services = [] }) => {
  return (
    <section id="services" className="relative bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <ServicesHeader />

        {/* Services List */}
        <ServicesList services={services} />
      </div>
    </section>
  )
}

export default ServicesSection
