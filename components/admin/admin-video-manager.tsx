"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Search, Filter, Play, Edit, Trash2, Eye, Download, X, Clock, FileVideo, Settings } from "lucide-react"

interface Video {
  id: number
  title: string
  filename: string
  duration: string
  size: string
  format: string
  resolution: string
  uploadDate: string
  status: "processing" | "ready" | "error"
  thumbnail: string
  description: string
  tags: string[]
  views: number
}

export default function AdminVideoManager() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      title: "Parsa Decor Company Trailer",
      filename: "parsa-decor-trailer.mp4",
      duration: "2:34",
      size: "45.2 MB",
      format: "MP4",
      resolution: "1920x1080",
      uploadDate: "2024-01-15",
      status: "ready",
      thumbnail: "/placeholder.svg?height=180&width=320",
      description: "Official company trailer showcasing our interior design projects",
      tags: ["trailer", "company", "showcase"],
      views: 1250,
    },
    {
      id: 2,
      title: "Modern Apartment Transformation",
      filename: "apartment-transformation.mp4",
      duration: "4:12",
      size: "78.5 MB",
      format: "MP4",
      resolution: "1920x1080",
      uploadDate: "2024-01-14",
      status: "ready",
      thumbnail: "/placeholder.svg?height=180&width=320",
      description: "Complete transformation of a modern apartment in Beyoğlu",
      tags: ["apartment", "modern", "transformation"],
      views: 890,
    },
    {
      id: 3,
      title: "Office Design Process",
      filename: "office-design-process.mp4",
      duration: "3:45",
      size: "62.1 MB",
      format: "MP4",
      resolution: "1920x1080",
      uploadDate: "2024-01-13",
      status: "processing",
      thumbnail: "/placeholder.svg?height=180&width=320",
      description: "Behind the scenes of our office design process",
      tags: ["office", "process", "design"],
      views: 0,
    },
  ])

  const [selectedVideos, setSelectedVideos] = useState<number[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "ready" | "processing" | "error">("all")

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === "all" || video.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelection = (id: number) => {
    setSelectedVideos((prev) => (prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id]))
  }

  const handleEdit = (video: Video) => {
    setEditingVideo(video)
    setShowEditModal(true)
  }

  const handleSaveEdit = (updatedVideo: Video) => {
    setVideos((prev) => prev.map((v) => (v.id === updatedVideo.id ? updatedVideo : v)))
    setShowEditModal(false)
    setEditingVideo(null)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this video?")) {
      setVideos((prev) => prev.filter((v) => v.id !== id))
      setSelectedVideos((prev) => prev.filter((vid) => vid !== id))
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedVideos.length} videos?`)) {
      setVideos((prev) => prev.filter((v) => !selectedVideos.includes(v.id)))
      setSelectedVideos([])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "text-green-600 bg-green-100"
      case "processing":
        return "text-yellow-600 bg-yellow-100"
      case "error":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Video Manager</h1>
          <p className="text-slate-600 mt-1">Upload, organize, and manage your video content</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Video</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Videos", value: videos.length, icon: FileVideo, color: "blue" },
          { label: "Ready", value: videos.filter((v) => v.status === "ready").length, icon: Play, color: "green" },
          {
            label: "Processing",
            value: videos.filter((v) => v.status === "processing").length,
            icon: Clock,
            color: "yellow",
          },
          {
            label: "Total Views",
            value: videos.reduce((sum, v) => sum + v.views, 0).toLocaleString(),
            icon: Eye,
            color: "purple",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="ready">Ready</option>
                <option value="processing">Processing</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedVideos.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">{selectedVideos.length} selected</span>
              <button
                onClick={handleBulkDelete}
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              selectedVideos.includes(video.id) ? "border-orange-500" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-slate-100 rounded-t-lg overflow-hidden">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />

              {/* Status Badge */}
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(video.status)}`}
              >
                {video.status}
              </div>

              {/* Duration */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {video.duration}
              </div>

              {/* Play Button */}
              {video.status === "ready" && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/30 transition-opacity">
                  <button className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-slate-900 ml-1" />
                  </button>
                </div>
              )}

              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2">
                <input
                  type="checkbox"
                  checked={selectedVideos.includes(video.id)}
                  onChange={() => toggleSelection(video.id)}
                  className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{video.title}</h3>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{video.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {video.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>
                  {video.format} • {video.resolution}
                </span>
                <span>{video.size}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <span>Uploaded {video.uploadDate}</span>
                <span>{video.views} views</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(video)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <VideoUploadModal
            onClose={() => setShowUploadModal(false)}
            onUpload={(newVideo) => {
              setVideos((prev) => [...prev, { ...newVideo, id: Date.now() }])
              setShowUploadModal(false)
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingVideo && (
          <VideoEditModal
            video={editingVideo}
            onClose={() => {
              setShowEditModal(false)
              setEditingVideo(null)
            }}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function VideoUploadModal({
  onClose,
  onUpload,
}: { onClose: () => void; onUpload: (video: Omit<Video, "id">) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    file: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.file) return

    const newVideo: Omit<Video, "id"> = {
      title: formData.title,
      filename: formData.file.name,
      duration: "0:00",
      size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      format: formData.file.type.split("/")[1].toUpperCase(),
      resolution: "1920x1080",
      uploadDate: new Date().toISOString().split("T")[0],
      status: "processing",
      thumbnail: "/placeholder.svg?height=180&width=320",
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      views: 0,
    }

    onUpload(newVideo)
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
        className="bg-white rounded-lg p-6 w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">Upload Video</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Video File</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 mb-2">Choose video file</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setFormData((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="cursor-pointer px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Browse Files
              </label>
              {formData.file && <p className="text-sm text-slate-600 mt-2">{formData.file.name}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="e.g. interior, design, modern"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-900">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.file || !formData.title}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload Video
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function VideoEditModal({
  video,
  onClose,
  onSave,
}: { video: Video; onClose: () => void; onSave: (video: Video) => void }) {
  const [formData, setFormData] = useState({
    title: video.title,
    description: video.description,
    tags: video.tags.join(", "),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...video,
      title: formData.title,
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
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
        className="bg-white rounded-lg p-6 w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">Edit Video</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-900">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
