"use client";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "./firebase";

export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function loginAdmin(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logoutAdmin() {
  await signOut(auth);
}

export function canManageRoles(role: string) {
  return role === "super_admin";
}

export function canDeleteSettings(role: string) {
  return role === "super_admin" || role === "admin";
}

export function canManageUsers(role: string) {
  return role === "super_admin";
}
