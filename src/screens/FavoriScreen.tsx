import React, {useContext, useEffect} from 'react';
import {
  favoriteItem,
  fetchFavoriteItemsFromFirestore,
  removeFromFavorites,
  setFavoriteItems,
} from '../store/favoriteSlice';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../navigation/AuthProvider';
import {RootState} from '../store/store';

const FavorisScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {user} = useContext(AuthContext);
  const favorisItems = useSelector((state: RootState) => state.favoris);

  // FETCHING DATA WHEN USING FIRESTORE
  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!favorisItems.length) {
          const items = await fetchFavoriteItemsFromFirestore(user.uid);
          dispatch(setFavoriteItems(items));
        }
        fetchItems();
      } catch (error) {
        console.log('Error fetching favorite items', error);
      }
    };
  }, [dispatch]);

  const handleRemoveFav = (item: favoriteItem) => {
    dispatch(removeFromFavorites({item: item.product, userId: user.uid}));
  };

  const renderItem = ({item}: {item: favoriteItem}) => (
    <View style={styles.itemView}>
      <Image source={{uri: item?.product?.image}} style={styles.itemImage} />
      <View style={styles.nameView}>
        <Text style={styles.nameText} numberOfLines={1}>
          {item?.product?.title}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.removeBtn,
            {
              backgroundColor: '#fff',
              borderColor: '#1A7EFC',
              borderWidth: 1,
            },
          ]}
          onPress={() => handleRemoveFav(item)}>
          <Text style={{color: '#1A7EFC', fontSize: 20, fontWeight: '700'}}>
            -
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorisItems.length ? (
        <FlatList
          data={favorisItems}
          renderItem={renderItem}
          keyExtractor={item => item?.product?.id.toString()}
        />
      ) : (
        <View style={styles.emptyMsg}>
          <Image
            source={require('../images/toucher.png')}
            style={styles.EmptyFav}
          />
          <Text style={styles.emptyText}>No Favorite items !</Text>
        </View>
      )}
    </View>
  );

  {
    /*return (
    <View style={styles.container}>
      {favorites.map((favorite, index) => (
        <View style={styles.itemView}>
          <Image
            key={favorite.item.id}
            source={{uri: favorite?.item?.image}}
            style={styles.itemImage}
          />
          <View style={styles.nameView}>
            <Text
              key={favorite.item.title}
              style={styles.nameText}
              numberOfLines={2}>
              {favorite?.item?.title}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.addToCartBtn, {backgroundColor: '#1A7EFC'}]}
            onPress={() => removeFromFavoritesAsync(favorite.item.id)}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
              -
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
      );*/
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    //margin: 5,
  },
  nameView: {
    width: '50%',
    // marginLeft: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  addToCartBtn: {
    padding: 2,
    borderRadius: 10,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emptyMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EmptyFav: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 20,
  },
  removeBtn: {
    padding: 2,
    borderRadius: 10,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default FavorisScreen;
