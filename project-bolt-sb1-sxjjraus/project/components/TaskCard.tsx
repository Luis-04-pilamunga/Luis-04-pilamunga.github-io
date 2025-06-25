import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CircleCheck as CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react-native';
import { Task } from '@/types/Task';

const { width } = Dimensions.get('window');

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const categoryColors = {
  work: '#3B82F6',
  personal: '#8B5CF6',
  health: '#10B981',
  learning: '#F59E0B',
  shopping: '#EF4444',
};

const priorityColors = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
};

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const categoryColor = categoryColors[task.category];
  const priorityColor = priorityColors[task.priority];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <TouchableOpacity
        style={styles.checkButton}
        onPress={() => onToggle(task.id)}
      >
        {task.completed ? (
          <CheckCircle2 size={24} color="#10B981" strokeWidth={2} />
        ) : (
          <Circle size={24} color="#9CA3AF" strokeWidth={2} />
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>
            {task.title}
          </Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(task.id)}
          >
            <Trash2 size={18} color="#EF4444" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {task.description && (
          <Text style={[styles.description, task.completed && styles.completedDescription]}>
            {task.description}
          </Text>
        )}

        <View style={styles.metadata}>
          <View style={styles.tags}>
            <View style={[styles.categoryTag, { backgroundColor: categoryColor }]}>
              <Text style={styles.categoryText}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </Text>
            </View>
            <View style={[styles.priorityTag, { borderColor: priorityColor }]}>
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {task.priority.toUpperCase()}
              </Text>
            </View>
          </View>

          {task.dueDate && (
            <View style={styles.dueDateContainer}>
              <Clock size={14} color="#6B7280" strokeWidth={2} />
              <Text style={styles.dueDate}>
                {formatDate(task.dueDate)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  completedContainer: {
    backgroundColor: '#F9FAFB',
    borderLeftColor: '#10B981',
  },
  checkButton: {
    marginRight: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  deleteButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  completedDescription: {
    color: '#9CA3AF',
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
  },
  priorityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  priorityText: {
    fontSize: 11,
    fontFamily: 'Inter-Bold',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});