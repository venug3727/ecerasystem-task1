import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, MapPin, TrendingUp, ArrowRight, Plus, Search } from 'lucide-react';

const HomePage: React.FC = () => {
  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '1,200+' },
    { icon: Users, label: 'Companies', value: '450+' },
    { icon: MapPin, label: 'Locations', value: '25+' },
    { icon: TrendingUp, label: 'Successful Hires', value: '3,400+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Find Your{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of opportunities from top companies worldwide. Whether you're
              starting your career or looking for your next adventure, we've got you covered.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/jobs"
                className="group bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Browse Jobs
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/add-job"
                className="group bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-indigo-200 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post a Job
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white/50"
                  >
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 rounded-lg w-fit mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose JobPortal?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We connect talented professionals with amazing opportunities through our modern, 
            user-friendly platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy Job Search</h3>
            <p className="text-gray-600">
              Find relevant opportunities quickly with our advanced filtering and search capabilities.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Top Companies</h3>
            <p className="text-gray-600">
              Connect with leading companies across various industries and career levels.
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Career Growth</h3>
            <p className="text-gray-600">
              Take your career to the next level with opportunities that match your skills and goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;