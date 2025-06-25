import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { CircleCheck as CheckCircle2, Clock, Target, TrendingUp, Calendar, ChartBar as BarChart3 } from 'lucide-react-native';
import { useTasks } from '@/hooks/useTasks';
import { StatsCard } from '@/components/StatsCard';

const { width } = Dimensions.get('window');

export default function StatisticsScreen() {
  const { tasks, getTaskStats, getTasksByCategory } = useTasks();
  const stats = getTaskStats();

  const categoryStats = [
    { key: 'work', label: 'Trabajo', color: '#3B82F6' },
    { key: 'personal', label: 'Personal', color: '#8B5CF6' },
    { key: 'health', label: 'Salud', color: '#10B981' },
    { key: 'learning', label: 'Aprendizaje', color: '#F59E0B' },
    { key: 'shopping', label: 'Compras', color: '#EF4444' },
  ].map(category => ({
    ...category,
    tasks: getTasksByCategory(category.key as any),
    completed: getTasksByCategory(category.key as any).filter(t => t.completed).length,
  }));

  const getMotivationalMessage = () => {
    if (stats.completionRate >= 80) {
      return {
        title: '🎉 ¡Excelente trabajo!',
        message: 'Tienes un rendimiento increíble. ¡Sigue así!',
      };
    } else if (stats.completionRate >= 60) {
      return {
        title: '👍 ¡Buen progreso!',
        message: 'Vas por buen camino. Un poco más de esfuerzo y serás imparable.',
      };
    } else if (stats.completionRate >= 40) {
      return {
        title: '💪 ¡Puedes mejorar!',
        message: 'Cada tarea completada te acerca más a tus objetivos.',
      };
    } else {
      return {
        title: '🚀 ¡Hora de empezar!',
        message: 'Los grandes logros comienzan con pequeños pasos. ¡Tú puedes!',
      };
    }
  };

  const motivation = getMotivationalMessage();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estadísticas</Text>
        <Text style={styles.subtitle}>Tu progreso y rendimiento</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Motivational Card */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>{motivation.title}</Text>
          <Text style={styles.motivationMessage}>{motivation.message}</Text>
        </View>

        {/* Main Stats */}
        <View style={styles.statsRow}>
          <StatsCard
            title="Completadas"
            value={stats.completedTasks}
            subtitle={`de ${stats.totalTasks} tareas`}
            color="#10B981"
            icon={<CheckCircle2 size={20} color="#10B981" strokeWidth={2} />}
          />
          <StatsCard
            title="Pendientes"
            value={stats.pendingTasks}
            subtitle="por hacer"
            color="#F59E0B"
            icon={<Clock size={20} color="#F59E0B" strokeWidth={2} />}
          />
        </View>

        <View style={styles.statsRow}>
          <StatsCard
            title="Porcentaje"
            value={`${Math.round(stats.completionRate)}%`}
            subtitle="completado"
            color="#3B82F6"
            icon={<Target size={20} color="#3B82F6" strokeWidth={2} />}
          />
          <StatsCard
            title="Racha"
            value={stats.currentStreak}
            subtitle="días seguidos"
            color="#8B5CF6"
            icon={<TrendingUp size={20} color="#8B5CF6" strokeWidth={2} />}
          />
        </View>

        <View style={styles.statsRow}>
          <StatsCard
            title="Hoy"
            value={stats.todayCompleted}
            subtitle="completadas"
            color="#EF4444"
            icon={<Calendar size={20} color="#EF4444" strokeWidth={2} />}
          />
          <StatsCard
            title="Total"
            value={stats.totalTasks}
            subtitle="tareas creadas"
            color="#6B7280"
            icon={<BarChart3 size={20} color="#6B7280" strokeWidth={2} />}
          />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Progreso General</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${stats.completionRate}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(stats.completionRate)}% completado
            </Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Por Categoría</Text>
          {categoryStats.map((category) => (
            <View key={category.key} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <View
                    style={[styles.categoryDot, { backgroundColor: category.color }]}
                  />
                  <Text style={styles.categoryName}>{category.label}</Text>
                </View>
                <Text style={styles.categoryCount}>
                  {category.completed}/{category.tasks.length}
                </Text>
              </View>
              <View style={styles.categoryProgressBar}>
                <View
                  style={[
                    styles.categoryProgressFill,
                    {
                      backgroundColor: category.color,
                      width: category.tasks.length > 0
                        ? `${(category.completed / category.tasks.length) * 100}%`
                        : '0%',
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  motivationTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  motivationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
  },
  categorySection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  categoryCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  categoryProgressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  bottomSpacing: {
    height: 100,
  },
});