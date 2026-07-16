const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');

// @route   GET /api/projects
// @desc    Fetch all projects, newest/ordered first
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Get Projects Error:', err.message);
    res.status(500).json({ message: 'Server error fetching projects' });
  }
};

// @route   GET /api/projects/:id
// @desc    Fetch a single project
// @access  Public
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error('Get Project Error:', err.message);
    res.status(500).json({ message: 'Server error fetching project' });
  }
};

// @route   POST /api/projects
// @desc    Create a new project with an uploaded image
// @access  Private (admin key)
exports.createProject = async (req, res) => {
  const { title, description, category, tags, projectUrl, order } = req.body;
  const coverFile = req.files?.image?.[0];
  const galleryFiles = req.files?.gallery || [];
  const videoFile = req.files?.video?.[0];

  if (!title || !description) {
    return res.status(400).json({ message: 'Please provide title and description' });
  }

  if (!coverFile) {
    return res.status(400).json({ message: 'Please upload a project image' });
  }

  try {
    const uploadResult = await cloudinary.uploadBuffer(coverFile.buffer);
    const galleryResults = await Promise.all(
      galleryFiles.map((file) => cloudinary.uploadBuffer(file.buffer))
    );
    const videoResult = videoFile
      ? await cloudinary.uploadBuffer(videoFile.buffer, { resource_type: 'video' })
      : null;

    const project = new Project({
      title,
      description,
      category,
      tags: tags ? tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      projectUrl,
      order: order || 0,
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      images: galleryResults.map((r) => ({ url: r.secure_url, publicId: r.public_id })),
      videoUrl: videoResult?.secure_url,
      videoPublicId: videoResult?.public_id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error('Create Project Error:', err.message);
    res.status(500).json({ message: 'Server error creating project' });
  }
};

// @route   PUT /api/projects/:id
// @desc    Update a project, optionally replacing its image
// @access  Private (admin key)
exports.updateProject = async (req, res) => {
  const { title, description, category, tags, projectUrl, order } = req.body;
  const coverFile = req.files?.image?.[0];
  const galleryFiles = req.files?.gallery || [];
  const videoFile = req.files?.video?.[0];

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (category !== undefined) project.category = category;
    if (tags !== undefined) {
      project.tags = tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }
    if (projectUrl !== undefined) project.projectUrl = projectUrl;
    if (order !== undefined) project.order = order;

    if (coverFile) {
      const oldPublicId = project.imagePublicId;
      const uploadResult = await cloudinary.uploadBuffer(coverFile.buffer);
      project.imageUrl = uploadResult.secure_url;
      project.imagePublicId = uploadResult.public_id;
      await cloudinary.uploader.destroy(oldPublicId).catch((err) => {
        console.error('Cloudinary Cleanup Error:', err.message);
      });
    }

    if (galleryFiles.length > 0) {
      const galleryResults = await Promise.all(
        galleryFiles.map((file) => cloudinary.uploadBuffer(file.buffer))
      );
      project.images.push(
        ...galleryResults.map((r) => ({ url: r.secure_url, publicId: r.public_id }))
      );
    }

    if (videoFile) {
      const oldVideoPublicId = project.videoPublicId;
      const videoResult = await cloudinary.uploadBuffer(videoFile.buffer, {
        resource_type: 'video',
      });
      project.videoUrl = videoResult.secure_url;
      project.videoPublicId = videoResult.public_id;
      if (oldVideoPublicId) {
        await cloudinary.uploader
          .destroy(oldVideoPublicId, { resource_type: 'video' })
          .catch((err) => {
            console.error('Cloudinary Cleanup Error:', err.message);
          });
      }
    }

    await project.save();
    res.json(project);
  } catch (err) {
    console.error('Update Project Error:', err.message);
    res.status(500).json({ message: 'Server error updating project' });
  }
};

// @route   DELETE /api/projects/:id
// @desc    Delete a project and its Cloudinary image
// @access  Private (admin key)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const publicIds = [project.imagePublicId, ...project.images.map((img) => img.publicId)];
    await Promise.all(
      publicIds.map((id) =>
        cloudinary.uploader.destroy(id).catch((err) => {
          console.error('Cloudinary Cleanup Error:', err.message);
        })
      )
    );

    if (project.videoPublicId) {
      await cloudinary.uploader
        .destroy(project.videoPublicId, { resource_type: 'video' })
        .catch((err) => {
          console.error('Cloudinary Cleanup Error:', err.message);
        });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Delete Project Error:', err.message);
    res.status(500).json({ message: 'Server error deleting project' });
  }
};
