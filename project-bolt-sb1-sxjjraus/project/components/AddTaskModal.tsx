import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X, Plus } from 'lucide-react-native';
import { TaskCategory, TaskPriority } from '@/types/Task';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (taskData: {
    title: string;
    description?: string;
    category: TaskCategory;
    priority: TaskPriority;
    dueDate?: Date;
  }) => void;
}

const categories: { key: TaskCategory; label: string; color: string }[] = [
  { key: 'work', label: 'Trabajo', color: '#3B82F6' },
  { key: 'personal', label: 'Personal', color: '#8B5CF6' },
  { key: 'health', label: 'Salud', color: '#10B981' },
  { key: 'learning', label: 'Aprendizaje', color: '#F59E0B' },
  { key: 'shopping', label: 'Compras', color: '#EF4444' },
];

const priorities: { key: TaskPriority; label: string; color: string }[] = [
  { key: 'high', label: 'Alta', color: '#EF4444' },
  { key: 'medium', label: 'Media', color: '#F59E0B' },
  { key: 'low', label: 'Baja', color: '#10B981' },
];

export function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('personal');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>('medium');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedCategory('personal');
    setSelectedPriority('medium');
  };

  const handleAdd = () => {
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      category: selectedCategory,
      priority: selectedPriority,
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nueva Tarea</Text>
          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.addButton, !title.trim() && styles.addButtonDisabled]}
            disabled={!title.trim()}
          >
            <Plus size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Título *</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="¿Qué necesitas hacer?"
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={100}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Agrega más detalles (opcional)"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              maxLength={200}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categoría</Text>
            <View style={styles.optionsGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.option,
                    selectedCategory === category.key && [
                      styles.selectedOption,
                      { borderColor: category.color },
                    ],
                  ]}
                  onPress={() => setSelectedCategory(category.key)}
                >
                  <View
                    style={[styles.colorDot, { backgroundColor: category.color }]}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      selectedCategory === category.key && styles.selectedOptionText,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prioridad</Text>
            <View style={styles.optionsGrid}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority.key}
                  style={[
                    styles.option,
                    selectedPriority === priority.key && [
                      styles.selectedOption,
                      { borderColor: priority.color },
                    ],
                  ]}
                  onPress={() => setSelectedPriority(priority.key)}
                >
                  <View
                    style={[styles.colorDot, { backgroundColor: priority.color }]}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      selectedPriority === priority.key && styles.selectedOptionText,
                    ]}
                  >
                    {priority.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
  },
  selectedOption: {
    borderWidth: 2,
    backgroundColor: '#F8FAFC',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  selectedOptionText: {
    color: '#111827',
  },
});