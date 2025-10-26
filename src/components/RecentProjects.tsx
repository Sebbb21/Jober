import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Project {
  id: string;
  name: string;
  assignee: string;
  status: string;
  progress: number;
}

interface RecentProjectsProps {
  title: string;
  projects: Project[];
}

export default function RecentProjects({ title, projects }: RecentProjectsProps) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {projects.map((project) => (
        <View key={project.id} style={styles.projectCard}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectAssignee}>{project.assignee}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarWrapper}>
              <View style={styles.progressBarHeader}>
                <Text
                  style={[
                    styles.projectStatus,
                    project.status === 'Terminé' && styles.projectStatusCompleted,
                  ]}
                >
                  {project.status}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressBarFill, { width: `${project.progress}%` }]}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  projectAssignee: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
  },
  progressBarWrapper: {
    width: '100%',
  },
  progressBarHeader: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  projectStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  projectStatusCompleted: {
    color: '#10B981',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
});

