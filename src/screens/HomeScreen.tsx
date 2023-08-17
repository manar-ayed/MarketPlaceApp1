import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../content/Product';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data); // Update the state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('Details', {product: item})}>
      <Image style={styles.productImage} source={{uri: item.image}} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>Price: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const getCategories = (products: Product[]): string[] => {
    const categories: string[] = [];
    products.forEach(item => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    return categories;
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Filter the items based on the search query
  const filteredItems = products.filter((item: Product) => {
    const titleMatch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory
      ? item.category === selectedCategory
      : true;
    return titleMatch && categoryMatch;
  });

  // Unfilter items
  const handleClearFilter = () => {
    setSelectedCategory('');
  };
  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      {/* Filter by Category */}
      <View style={styles.filterContainer}>
        {/* All Button */}
        <TouchableOpacity
          style={[
            styles.filterOption,
            selectedCategory === '' && styles.selectedFilterOption,
          ]}
          onPress={handleClearFilter}>
          <Text style={styles.filterOptionText}>All</Text>
        </TouchableOpacity>

        <FlatList
          data={getCategories(products)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.filterOption,
                item === selectedCategory && styles.selectedFilterOption,
              ]}
              onPress={() => handleSelectCategory(item)}>
              <Text style={styles.filterOptionText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    margin: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },

  productDetails: {
    flex: 1,
  },

  productTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  selectedFilterOption: {
    backgroundColor: '#ccc',
  },
  filterOptionText: {
    fontSize: 14,
  },
});

export default HomeScreen;
