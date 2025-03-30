"use client"
import React from 'react';
import Link from 'next/link';
import { BarChart2, Users, Target, Award, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector(state=>state.user)
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.displayName  }👋</h1>
          <p className="text-gray-600">Here's what's happening with your career journey.</p>
        </div>
        <Link href={`/dashboard/assessment`} className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
          Take Assessment
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Career Match Score",
            value: "85%",
            change: "+5%",
            icon: Target,
            color: "text-violet-600",
            bgColor: "bg-violet-100"
          },
          {
            title: "Skills Completed",
            value: "24/36",
            change: "67%",
            icon: Award,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
          },
          {
            title: "Learning Hours",
            value: "47h",
            change: "+2.5h",
            icon: Clock,
            color: "text-green-600",
            bgColor: "bg-green-100"
          },
          {
            title: "Career Opportunities",
            value: "12",
            change: "New",
            icon: TrendingUp,
            color: "text-orange-600",
            bgColor: "bg-orange-100"
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-600 text-sm">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Careers */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recommended Careers</h2>
            <button className="text-violet-600 hover:text-violet-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                role: "UX Designer",
                company: "Technology",
                match: "95%",
                salary: "$75k - $120k"
              },
              {
                role: "Product Manager",
                company: "Software",
                match: "88%",
                salary: "$90k - $150k"
              },
              {
                role: "Data Analyst",
                company: "Analytics",
                match: "82%",
                salary: "$65k - $95k"
              }
            ].map((career, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{career.role}</h3>
                    <p className="text-sm text-gray-600">{career.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{career.match} Match</p>
                    <p className="text-sm text-gray-600">{career.salary}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-violet-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <button className="text-violet-600 hover:text-violet-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Completed Python Assessment",
                time: "2 hours ago",
                icon: Award,
                color: "text-green-600",
                bgColor: "bg-green-100"
              },
              {
                title: "Updated Career Preferences",
                time: "5 hours ago",
                icon: Target,
                color: "text-blue-600",
                bgColor: "bg-blue-100"
              },
              {
                title: "Started New Learning Path",
                time: "1 day ago",
                icon: TrendingUp,
                color: "text-violet-600",
                bgColor: "bg-violet-100"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`${activity.bgColor} p-2 rounded-lg`}>
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;