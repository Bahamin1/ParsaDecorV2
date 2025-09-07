"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  ImageIcon,
  Video,
  File,
  Trash2,
  Edit,
  Download,
  Eye,
  X,
} from "lucide-react"

export default function AdminMediaLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [filterType, setFilterType] = useState<"all" | "images" | "videos" | "documents">("all")

  const mediaItems = [
    {
      id: 1,
      name: "modern-apartment-1.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      name: "office-design-video.mp4",
      type: "video",
      size: "45.2 MB",
      duration: "2:34",
      uploadDate: "2024-01-14",
      url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "luxury-hotel-suite.jpg",
      type: "image",
      size: "3.1 MB",
      dimensions: "2560x1440",
      uploadDate: "2024-01-13",
      url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      name: "project-proposal.pdf",
      type: "document",
      size: "1.8 MB",
      pages: "12",
      uploadDate: "2024-01-12",
      url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      name: "kitchen-renovation.jpg",
      type: "image",
      size: "2.8 MB",
      dimensions: "1920x1280",
      uploadDate: "2024-01-11",
      url: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      name: "showreel-2024.mp4",
      type: "video",
      size: "78.5 MB",
      duration: "4:12",
      uploadDate: "2024-01-10",
      url: "/placeholder.svg?height=300&width=400",
    },
  ]

  const filteredItems = mediaItems.filter((item) => {
    if (filterType === "all") return true
    if (filterType === "images") return item.type === "image"
    if (filterType === "videos") return item.type === "video"
    if (filterType === "documents") return item.type === "document"
    return true
  })

  const toggleSelection = (id: number) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon
      case "video":
        return Video
      case "document":
        return File
      default:
        return File
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Media Library</h1>
          <p className="text-slate-600 mt-1">Manage your images, videos, and documents</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Media</span>
        </button>
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
                placeholder="Search media..."
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Files</option>
                <option value="images">Images</option>
                <option value="videos">Videos</option>
                <option value="documents">Documents</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Selected Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">{selectedItems.length} selected</span>
                <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* View Mode */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-6">
            {filteredItems.map((item, index) => {
              const FileIcon = getFileIcon(item.type)
              const isSelected = selectedItems.includes(item.id)

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`relative group cursor-pointer rounded-lg border-2 transition-all ${
                    isSelected ? "border-orange-500 bg-orange-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => toggleSelection(item.id)}
                >
                  <div className="aspect-square p-4">
                    {item.type === "image" || item.type === "video" ? (
                      <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.type === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                              <Video className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileIcon className="w-8 h-8 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-slate-200">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.size}</p>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center space-x-1">
                      <button className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50">
                        <Eye className="w-3 h-3 text-slate-600" />
                      </button>
                      <button className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-slate-50">
                        <Edit className="w-3 h-3 text-slate-600" />
                      </button>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 left-2">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredItems.map((item, index) => {
              const FileIcon = getFileIcon(item.type)
              const isSelected = selectedItems.includes(item.id)

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-center space-x-4 p-4 hover:bg-slate-50 cursor-pointer ${
                    isSelected ? "bg-orange-50" : ""
                  }`}
                  onClick={() => toggleSelection(item.id)}
                >
                  <div className="flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(item.id)}
                      className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex-shrink-0">
                    {item.type === "image" || item.type === "video" ? (
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden">
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <FileIcon className="w-6 h-6 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      {item.type === "image" && item.dimensions}
                      {item.type === "video" && item.duration}
                      {item.type === "document" && `${item.pages} pages`}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-sm text-slate-500">{item.size}</div>

                  <div className="flex-shrink-0 text-sm text-slate-500">{item.uploadDate}</div>

                  <div className="flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-slate-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
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
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Upload Media</h3>
                <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-sm text-slate-500">Supports: JPG, PNG, MP4, PDF (Max 100MB)</p>
                <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Choose Files
                </button>
              </div>

              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
