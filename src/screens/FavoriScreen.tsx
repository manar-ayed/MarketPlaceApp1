import React, {useContext, useEffect} from 'react';
import {
  favoriteItem,
  fetchFavoriteItemsFromFirestore,
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

  const renderItem = ({item}: {item: favoriteItem}) => (
    <View style={styles.itemView}>
      <Image source={{uri: item?.product?.image}} style={styles.itemImage} />
      <View style={styles.nameView}>
        <Text style={styles.nameText} numberOfLines={1}>
          {item?.product?.title}
        </Text>

        <Text style={styles.discountText}>{'$' + item?.product?.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorisItems}
        renderItem={renderItem}
        keyExtractor={item => item?.product?.id.toString()}
      />
    </View>
  );
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
    width: '30%',
    margin: 5,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 5,
  },
  addRemoveView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  addToCartBtn: {
    padding: 5,
    borderRadius: 15,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});

export default FavorisScreen;
