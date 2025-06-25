import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { User, Settings, Bell, CircleHelp as HelpCircle, Star, Shield, Download, LogOut, ChevronRight } from 'lucide-react-native';
import { useTasks } from '@/hooks/useTasks';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  color?: string;
}

function MenuItem({ icon, title, subtitle, onPress, showChevron = true, color = '#111827' }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>{icon}</View>
        <View style={styles.menuItemText}>
          <Text style={[styles.menuItemTitle, { color }]}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showChevron && (
        <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { getTaskStats } = useTasks();
  const stats = getTaskStats();

  const handleMenuPress = (item: string) => {
    console.log(`Pressed: ${item}`);
    // Here you would handle navigation or actions
  };

  const getMembershipBadge = () => {
    if (stats.completionRate >= 80) return { text: 'Productivo Master', color: '#EF4444' };
    if (stats.completionRate >= 60) return { text: 'Organizador Pro', color: '#F59E0B' };
    if (stats.completionRate >= 40) return { text: 'Planificador', color: '#3B82F6' };
    return { text: 'Principiante', color: '#10B981' };
  };

  const badge = getMembershipBadge();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
                }}
                style={styles.avatar}
              />
              <View style={[styles.badge, { backgroundColor: badge.color }]}>
                <Star size={12} color="#FFFFFF" strokeWidth={2} />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Usuario Productivo</Text>
              <Text style={styles.profileEmail}>usuario@ejemplo.com</Text>
              <View style={styles.membershipBadge}>
                <Text style={[styles.membershipText, { color: badge.color }]}>
                  {badge.text}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalTasks}</Text>
              <Text style={styles.statLabel}>Tareas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.completedTasks}</Text>
              <Text style={styles.statLabel}>Completadas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Días</Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon={<User size={20} color="#3B82F6" strokeWidth={2} />}
              title="Información Personal"
              subtitle="Actualiza tu perfil"
              onPress={() => handleMenuPress('profile')}
            />
            <MenuItem
              icon={<Settings size={20} color="#6B7280" strokeWidth={2} />}
              title="Configuración"
              subtitle="Preferencias de la app"
              onPress={() => handleMenuPress('settings')}
            />
            <MenuItem
              icon={<Bell size={20} color="#F59E0B" strokeWidth={2} />}
              title="Notificaciones"
              subtitle="Recordatorios y alertas"
              onPress={() => handleMenuPress('notifications')}
            />
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Soporte</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon={<HelpCircle size={20} color="#10B981" strokeWidth={2} />}
              title="Centro de Ayuda"
              subtitle="FAQs y guías"
              onPress={() => handleMenuPress('help')}
            />
            <MenuItem
              icon={<Star size={20} color="#EF4444" strokeWidth={2} />}
              title="Calificar App"
              subtitle="Comparte tu experiencia"
              onPress={() => handleMenuPress('rate')}
            />
            <MenuItem
              icon={<Shield size={20} color="#8B5CF6" strokeWidth={2} />}
              title="Privacidad"
              subtitle="Política y términos"
              onPress={() => handleMenuPress('privacy')}
            />
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Avanzado</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon={<Download size={20} color="#6B7280" strokeWidth={2} />}
              title="Exportar Datos"
              subtitle="Descarga tu información"
              onPress={() => handleMenuPress('export')}
            />
            <MenuItem
              icon={<LogOut size={20} color="#EF4444" strokeWidth={2} />}
              title="Cerrar Sesión"
              onPress={() => handleMenuPress('logout')}
              showChevron={false}
              color="#EF4444"
            />
          </View>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>TaskFlow v1.0.0</Text>
          <Text style={styles.appCredits}>Hecho con ❤️ para ser más productivo</Text>
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
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  membershipBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  quickStats: {
    flexDirection: 'row',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 36,
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appCredits: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 50,
  },
});