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
    <section id="services" className="relative bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <ServicesHeader />

        {/* Services List */}
        <ServicesList services={services} />
      </div>
    </section>
  )
}

export default ServicesSection
