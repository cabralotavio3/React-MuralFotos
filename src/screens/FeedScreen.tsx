import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Post {
  id: string;
  imagemUrl: string;
  legenda: string;
}

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const queryPosts = query(collection(db, 'posts'), orderBy('dataCriacao', 'desc'));

    const unsubscribe = onSnapshot(queryPosts, (snapshot) => {
      const listaPosts: Post[] = [];
      snapshot.forEach((doc) => {
        listaPosts.push({
          id: doc.id,
          ...doc.data()
        } as Post);
      });
      setPosts(listaPosts);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagemUrl }} style={styles.imagemPost} />
            <View style={styles.footerCard}>
              <Text style={styles.legenda}>{item.legenda}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagemPost: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  footerCard: {
    padding: 15,
  },
  legenda: {
    fontSize: 16,
    color: '#333',
  },
});