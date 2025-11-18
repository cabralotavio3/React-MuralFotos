import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function NovoPostScreen() {
  const [uriImagem, setUriImagem] = useState<string | null>(null);
  const [legenda, setLegenda] = useState('');
  const [enviando, setEnviando] = useState(false);

  const selecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!resultado.canceled) {
      setUriImagem(resultado.assets[0].uri);
    }
  };

  const handlePostar = async () => {
    setEnviando(true);
    // Aqui entrará a lógica do Firebase no próximo passo
    console.log("Enviando imagem:", uriImagem);
    console.log("Legenda:", legenda);
    
    setTimeout(() => {
      setEnviando(false);
      Alert.alert("Sucesso", "Lógica de upload será implementada a seguir!");
    }, 2000);
  };

  const podePostar = uriImagem !== null && legenda.trim().length > 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoImagem} onPress={selecionarImagem}>
        {uriImagem ? (
          <Image source={{ uri: uriImagem }} style={styles.imagemPreview} />
        ) : (
          <Text style={styles.textoBotaoImagem}>+ Escolher Foto</Text>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Escreva uma legenda..."
        value={legenda}
        onChangeText={setLegenda}
        multiline
      />

      <TouchableOpacity
        style={[styles.botaoPostar, !podePostar && styles.botaoDesabilitado]}
        onPress={handlePostar}
        disabled={!podePostar || enviando}
      >
        {enviando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.textoBotaoPostar}>Postar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  botaoImagem: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagemPreview: {
    width: '100%',
    height: '100%',
  },
  textoBotaoImagem: {
    fontSize: 18,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  botaoPostar: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#ccc',
  },
  textoBotaoPostar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});