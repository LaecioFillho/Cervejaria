import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { initializeDatabase } from "./storage/initializeDataBase";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="myDatabase.db"
      onInit={initializeDatabase}>
      <Stack screenOptions={{headerShown: false, statusBarStyle: "dark" }}/>
    </SQLiteProvider>
  );
}
