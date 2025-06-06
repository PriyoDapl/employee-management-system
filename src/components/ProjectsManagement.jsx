'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import ConfirmationModal from './ConfirmationModal';

const ProjectsManagement = ({ user, onBack }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, project: null });
  const [formData, setFormData] = useState({
    name: '',
    details: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.name.trim() || !formData.details.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const url = editingProject 
        ? `/api/projects/${editingProject._id}` 
        : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          details: formData.details.trim()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
        setFormData({ name: '', details: '' });
        setEditingProject(null);
        fetchProjects(); // Refresh projects list
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setError('Error saving project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      details: project.details
    });
    setError('');
    setSuccess('');
  };

  const handleDelete = (project) => {
    setDeleteConfirmation({
      isOpen: true,
      project: project
    });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.project) {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/projects/${deleteConfirmation.project._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setSuccess('Project deleted successfully!');
          fetchProjects(); // Refresh projects list
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Error deleting project');
      } finally {
        setLoading(false);
        setDeleteConfirmation({ isOpen: false, project: null });
      }
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, project: null });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({ name: '', details: '' });
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Projects Management
          </h2>
          <Button onClick={onBack} variant="primary">
            Back to Dashboard
          </Button>
        </div>

        {/* Create/Edit Project Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h3>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
                required
              />
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                Project Details 
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project details and description"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
              </Button>
              
              {editingProject && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Projects List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            All Projects ({projects.length})
          </h3>

          {loading && projects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600">No projects created yet.</p>
              <p className="text-gray-500 text-sm">Create your first project using the form above.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg shadow-lg p-6 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] self-start overflow-hidden"
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 break-words overflow-wrap-anywhere">
                        {project.name}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 break-words whitespace-pre-wrap overflow-wrap-anywhere">
                      {project.details}
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                      {project.updatedAt !== project.createdAt && (
                        <p>Updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(project)}
                      variant="primary"
                      size="small"
                      className="flex-1"
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(project)}
                      variant="danger"
                      size="small"
                      className="flex-1"
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={deleteConfirmation.isOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          title="Delete Project"
          message={`Are you sure you want to delete the project "${deleteConfirmation.project?.name}"? It won't be saved anywhere else and hence, cannot be recovered.`}
          confirmText="Delete"
          cancelText="Cancel"
          confirmVariant="danger"
        />
      </div>
    </div>
  );
};

export default ProjectsManagement;
