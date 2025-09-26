import React from 'react'
import { BookOpen, Lock, Plus, Search, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import toast from 'react-hot-toast'

const Journal = () => {
  const [entries, setEntries] = React.useState([])
  const [selectedEntry, setSelectedEntry] = React.useState(null)
  const [isCreating, setIsCreating] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [newEntry, setNewEntry] = React.useState({
    title: '',
    content: '',
    isPrivate: true
  })

  React.useEffect(() => {
    fetchJournalEntries()
  }, [])

  const fetchJournalEntries = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/journal', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setEntries(data.entries || [])
      } else {
        console.error('Failed to fetch journal entries')
        toast.error('Failed to load journal entries')
      }
    } catch (error) {
      console.error('Error fetching journal entries:', error)
      toast.error('Error loading journal entries')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateEntry = async () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      toast.error('Please fill in both title and content')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          title: newEntry.title,
          content: newEntry.content,
          isPrivate: newEntry.isPrivate
        })
      })

      if (response.ok) {
        const data = await response.json()
        const updatedEntries = [data.entry, ...entries]
        setEntries(updatedEntries)
        setNewEntry({ title: '', content: '', isPrivate: true })
        setIsCreating(false)
        setSelectedEntry(data.entry)
        toast.success('Journal entry created!')
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to create journal entry')
      }
    } catch (error) {
      console.error('Error creating journal entry:', error)
      toast.error('Error creating journal entry')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateEntry = async (updatedEntry) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/journal/${updatedEntry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          title: updatedEntry.title,
          content: updatedEntry.content,
          isPrivate: updatedEntry.isPrivate
        })
      })

      if (response.ok) {
        const data = await response.json()
        const updatedEntries = entries.map(entry =>
          entry._id === updatedEntry._id ? data.entry : entry
        )
        setEntries(updatedEntries)
        setSelectedEntry(data.entry)
        toast.success('Entry updated!')
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to update journal entry')
      }
    } catch (error) {
      console.error('Error updating journal entry:', error)
      toast.error('Error updating journal entry')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEntry = async (entryId) => {
    if (!window.confirm('Are you sure you want to delete this journal entry?')) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/journal/${entryId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        const updatedEntries = entries.filter(entry => entry._id !== entryId)
        setEntries(updatedEntries)
        setSelectedEntry(null)
        toast.success('Entry deleted!')
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to delete journal entry')
      }
    } catch (error) {
      console.error('Error deleting journal entry:', error)
      toast.error('Error deleting journal entry')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Private Journal
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          A safe space for your thoughts, feelings, and reflections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Create New Entry */}
          <div className="card">
            <button
              onClick={() => setIsCreating(true)}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Entry</span>
            </button>
          </div>

          {/* Search */}
          <div className="card">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Entries List */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-zen-600 dark:text-zen-400" />
              <span>Your Entries ({filteredEntries.length})</span>
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {isLoading && entries.length === 0 ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zen-600 mx-auto mb-2"></div>
                  <span className="text-sm text-gray-500">Loading entries...</span>
                </div>
              ) : (
                filteredEntries.map(entry => (
                  <button
                    key={entry._id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`
                      w-full text-left p-3 rounded-lg border transition-all duration-200 hover:shadow-md
                      ${selectedEntry?._id === entry._id
                        ? 'border-zen-500 bg-zen-50 dark:bg-zen-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-zen-300 dark:hover:border-zen-600'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {format(new Date(entry.createdAt), 'MMM d, yyyy')}
                        </p>
                      </div>
                      {entry.isPrivate && (
                        <Lock className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))
              )}
              
              {!isLoading && filteredEntries.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  {searchTerm ? 'No entries found' : 'No journal entries yet'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {isCreating ? (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  New Journal Entry
                </h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="btn-secondary text-sm"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What's on your mind?"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <div className="bg-white dark:bg-gray-700 rounded-lg">
                    <ReactQuill
                      theme="snow"
                      value={newEntry.content}
                      onChange={(content) => setNewEntry(prev => ({ ...prev, content }))}
                      modules={modules}
                      placeholder="Write your thoughts here..."
                      style={{ minHeight: '200px' }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={newEntry.isPrivate}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, isPrivate: e.target.checked }))}
                    className="rounded border-gray-300 text-zen-600 focus:ring-zen-500"
                  />
                  <label htmlFor="isPrivate" className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                    <Lock className="h-4 w-4" />
                    <span>Keep this entry private</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="btn-secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateEntry}
                    className="btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Entry'}
                  </button>
                </div>
              </div>
            </div>
          ) : selectedEntry ? (
            <EntryEditor
              entry={selectedEntry}
              onUpdate={handleUpdateEntry}
              onDelete={handleDeleteEntry}
              onClose={() => setSelectedEntry(null)}
              isLoading={isLoading}
            />
          ) : (
            <div className="card text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Welcome to your journal
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start by creating your first entry or select an existing one to read.
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="btn-primary"
              >
                Create First Entry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const EntryEditor = ({ entry, onUpdate, onDelete, onClose, isLoading }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedEntry, setEditedEntry] = React.useState(entry)

  const handleSave = () => {
    onUpdate(editedEntry)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(entry._id)
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {format(new Date(entry.createdAt), 'MMMM d, yyyy • h:mm a')}
          </span>
          {entry.isPrivate && (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)} 
                className="btn-secondary text-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="btn-primary text-sm"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)} 
                className="btn-secondary text-sm"
                disabled={isLoading}
              >
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                className="btn-secondary text-sm text-red-600 hover:text-red-700"
                disabled={isLoading}
              >
                Delete
              </button>
              <button 
                onClick={onClose} 
                className="btn-secondary text-sm"
                disabled={isLoading}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedEntry.title}
            onChange={(e) => setEditedEntry(prev => ({ ...prev, title: e.target.value }))}
            className="input-field text-xl font-semibold"
          />
          <div className="bg-white dark:bg-gray-700 rounded-lg">
            <ReactQuill
              theme="snow"
              value={editedEntry.content}
              onChange={(content) => setEditedEntry(prev => ({ ...prev, content }))}
              modules={modules}
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {entry.title}
          </h1>
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        </div>
      )}
    </div>
  )
}

export default Journal