"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Edit, Trash2, Eye, ImageIcon, Calendar, MapPin, X, Save } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  category: "residential" | "commercial" | "office" | "hospitality"
  location: string
  completionDate: string
  status: "completed" | "in-progress" | "planned"
  images: string[]
  tags: string[]
  client: string
  budget: string
  featured: boolean
}

export default function AdminProjectManager() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Modern Apartment in Beyoğlu",
      description: "Complete renovation of a 120m² apartment with contemporary design elements",
      category: "residential",
      location: "Beyoğlu, Istanbul",
      completionDate: "2024-01-15",
      status: "completed",
      images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
      tags: ["modern", "apartment", "renovation"],
      client: "Private Client",
      budget: "€45,000",
      featured: true,
    },
    {
      id: 2,
      title: "Luxury Office in Levent",
      description: "Corporate office design for a tech company with open spaces and modern amenities",
      category: "office",
      location: "Levent, Istanbul",
      completionDate: "2024-01-10",
      status: "completed",
      images: ["/placeholder.svg?height=300&width=400"],
      tags: ["office", "corporate", "modern"],
      client: "Tech Corp Ltd.",
      budget: "€120,000",
      featured: true,
    },
    {
      id: 3,
      title: "Boutique Hotel Suite",
      description: "Elegant hotel suite design with Turkish cultural elements",
      category: "hospitality",
      location: "Sultanahmet, Istanbul",
      completionDate: "2024-02-01",
      status: "in-progress",
      images: ["/placeholder.svg?height=300&width=400"],
      tags: ["hotel", "luxury", "cultural"],
      client: "Heritage Hotels",
      budget: "€80,000",
      featured: false,
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "residential" | "commercial" | "office" | "hospitality">(
    "all",
  )
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "in-progress" | "planned">("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setShowEditModal(true)
  }

  const handleSave = (updatedProject: Project) => {
    if (editingProject) {
      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
    } else {
      setProjects((prev) => [...prev, { ...updatedProject, id: Date.now() }])
    }
    setShowEditModal(false)
    setShowCreateModal(false)
    setEditingProject(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const toggleFeatured = (id: number) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "in-progress":
        return "text-yellow-600 bg-yellow-100"
      case "planned":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "residential":
        return "text-purple-600 bg-purple-100"
      case "commercial":
        return "text-blue-600 bg-blue-100"
      case "office":
        return "text-green-600 bg-green-100"
      case "hospitality":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Manager</h1>
          <p className="text-slate-600 mt-1">Manage your portfolio projects and showcase your work</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Projects", value: projects.length, color: "blue" },
          { label: "Completed", value: projects.filter((p) => p.status === "completed").length, color: "green" },
          { label: "In Progress", value: projects.filter((p) => p.status === "in-progress").length, color: "yellow" },
          { label: "Featured", value: projects.filter((p) => p.featured).length, color: "purple" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
          >
            <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="office">Office</option>
              <option value="hospitality">Hospitality</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
          >
            {/* Project Image */}
            <div className="relative aspect-video bg-slate-100">
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Featured
                </div>
              )}

              {/* Status Badge */}
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}
              >
                {project.status.replace("-", " ")}
              </div>

              {/* Image Count */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                <ImageIcon className="w-3 h-3" />
                <span>{project.images.length}</span>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-900 line-clamp-2">{project.title}</h3>
              </div>

              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{project.description}</p>

              {/* Category */}
              <div className="mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
              </div>

              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs text-slate-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{project.completionDate}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => toggleFeatured(project.id)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    project.featured
                      ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {project.featured ? "Featured" : "Feature"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && <ProjectModal onClose={() => setShowCreateModal(false)} onSave={handleSave} />}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingProject && (
          <ProjectModal
            project={editingProject}
            onClose={() => {
              setShowEditModal(false)
              setEditingProject(null)
            }}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
  onSave,
}: {
  project?: Project
  onClose: () => void
  onSave: (project: Project) => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || ("residential" as const),
    location: project?.location || "",
    completionDate: project?.completionDate || "",
    status: project?.status || ("planned" as const),
    client: project?.client || "",
    budget: project?.budget || "",
    tags: project?.tags.join(", ") || "",
    featured: project?.featured || false,
    images: project?.images || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const projectData: Project = {
      id: project?.id || 0,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      completionDate: formData.completionDate,
      status: formData.status,
      client: formData.client,
      budget: formData.budget,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      featured: formData.featured,
      images: formData.images.length > 0 ? formData.images : ["/placeholder.svg?height=300&width=400"],
    }

    onSave(projectData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">{project ? "Edit Project" : "Create New Project"}</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as any }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="office">Office</option>
                <option value="hospitality">Hospitality</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Completion Date</label>
              <input
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, completionDate: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Budget</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                placeholder="e.g. €50,000"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g. modern, luxury, renovation"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-slate-700">
              Feature this project on homepage
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-900">
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{project ? "Save Changes" : "Create Project"}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
