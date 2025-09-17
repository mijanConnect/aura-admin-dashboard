"use client";

import DashboardLayout from '@/components/layout/DashboardLayout';
import { use } from 'react';

export default function DashboardLayoutWrapper({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}