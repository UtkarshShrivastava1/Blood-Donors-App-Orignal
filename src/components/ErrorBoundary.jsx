"use client";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-red-600 text-lg font-bold">
            Something went wrong
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      );
    }

    return this.props.children;
  }
}
