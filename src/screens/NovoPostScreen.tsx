import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../config/firebase';

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
    if (!uriImagem) return;
    
    setEnviando(true);
    console.log("--- INICIANDO PROCESSO DE ENVIO ---");

    try {
      // 1. Converter imagem para Blob (formato de arquivo)
      console.log("1. Preparando imagem...");
      const response = await fetch(uriImagem);
      const blob = await response.blob();
      console.log("   Imagem convertida com sucesso.");

      // 2. Upload para o Storage
      const nomeArquivo = new Date().getTime();
      const caminhoArquivo = `atividade01/${nomeArquivo}.jpg`;
      console.log(`2. Enviando para o Storage: ${caminhoArquivo}`);
      
      const referenciaStorage = ref(storage, caminhoArquivo);
      await uploadBytes(referenciaStorage, blob);
      console.log("   Upload no Storage concluído!");

      // 3. Obter URL pública
      console.log("3. Gerando link da imagem...");
      const urlFoto = await getDownloadURL(referenciaStorage);
      console.log("   Link gerado:", urlFoto);

      // 4. Salvar dados no Firestore
      console.log("4. Salvando legenda no Banco de Dados...");
      await addDoc(collection(db, 'posts'), {
        imagemUrl: urlFoto,
        legenda: legenda,
        dataCriacao: serverTimestamp()
      });
      console.log("   Salvo no Firestore com sucesso!");

      // Sucesso total
      setUriImagem(null);
      setLegenda('');
      Alert.alert("Sucesso", "Sua foto foi postada no mural!");

    } catch (erro: any) {
      console.error("ERRO FATAL:", erro);
      Alert.alert("Erro", "Falha ao enviar: " + (erro.message || "Erro desconhecido"));
    } finally {
      setEnviando(false);
      console.log("--- FIM DO PROCESSO ---");
    }
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