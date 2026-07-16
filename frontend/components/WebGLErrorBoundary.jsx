'use client';

import { Component } from 'react';

export default class WebGLErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('3D hero scene failed, hiding it:', error?.message);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
