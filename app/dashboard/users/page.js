"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Calendar, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useGetUsersQuery } from "@/store/api/usersApi";
import CustomTable from "./../../../components/custom/CustomTable";

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users = [], isLoading } = useGetUsersQuery();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Define table columns
  const columns = [
    {
      key: "user",
      title: "User",
      render: (user) => (
        <p className="font-medium text-gray-900 text-left">{user.name}</p>
      ),
    },
    {
      key: "role",
      title: "Role",
      render: (user) => (
        <Badge
          variant={
            user.role === "admin"
              ? "default"
              : user.role === "moderator"
              ? "secondary"
              : "outline"
          }
          className="capitalize text-left"
        >
          {user.role}
        </Badge>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (user) => (
        <Badge
          className={`capitalize text-left ${
            user.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {user.status}
        </Badge>
      ),
    },
    {
      key: "joinDate",
      title: "Join Date",
      render: (user) => (
        <div className="flex items-center text-sm text-gray-600 text-left">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(user.joinDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (user) => (
        <div className="text-left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit User</DropdownMenuItem>
              <DropdownMenuItem>Change Role</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Deactivate User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const rows = filteredUsers.map((user) => ({
    key: user.id,
    ...user,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-50">User Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search */}
      {/* <Card className="md:col-span-2">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card> */}

      {/* Users Table */}
      {isLoading ? (
        <div className="space-y-4 text-gray-700">Loading...</div>
      ) : (
        <CustomTable columns={columns} rows={rows} />
      )}
    </div>
  );
}
