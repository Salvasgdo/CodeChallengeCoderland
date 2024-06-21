import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

interface Item {
  id: string;
  name: string;
  avatar: string;
}

const ListadoScreen = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://6172cfe5110a740017222e2b.mockapi.io/elements');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load data');
        setLoading(false);
      } 
    };

    fetchData();
  }, []);


  const renderItem = ({item}: {item: Item}) => {
    return <Card item={item} />;
  };

  const Card = ({item}: {item: Item}) => {
    const [imageError, setImageError] = useState(false);
    const handleImageError = () => {
      setImageError(true);
    };
    return (
      <View style={styles.item}>
        {imageError == false ? (
          <FastImage
            style={styles.image}
            source={{
              uri: item.avatar,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            onError={handleImageError}
            testID="FastImage"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.errorText}>Failed to load image</Text>
          </View>
        )}
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading} testID="Loading">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading} testID="Error">
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    color: 'black',
    alignSelf: 'center',
    paddingLeft: 10,
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 25,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default ListadoScreen;
