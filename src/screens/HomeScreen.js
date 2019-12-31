/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import {BASE_URL} from '../constants/api';

const HomeScreen = navigation => {
  // const [heroId, setId] = useState(null);
  // const [heroImage, setImage] = useState(null);
  let forbiddenId = [
    '51',
    '54',
    '74',
    '101',
    '113',
    '117',
    '124',
    '131',
    '133',
    '134',
    '143',
    '164',
    '184',
    '205',
    '244',
    '283',
    '288',
    '290',
    '291',
    '292',
    '362',
    '447',
    '453',
    '511',
    '512',
    '552',
    '553',
    '593',
    '603',
    '629',
    '662',
    '682',
    '694',
    '698',
    '715',
    '721',
    '725',
  ];
  let newArr = Array.from({length: 730}, (v, k) => k + 1);
  const [heroData, setData] = useState([]);
  const [itemCount, setCount] = useState(0);
  useEffect(() => {
    getHeroData();
  }, []);

  const getHeroData = async () => {
    const promises = newArr.map(async id => {
      const req = await fetch(`${BASE_URL}/${id}/image`);
      return req.json();
    });
    let data = await Promise.all(promises);
    data = data.filter(item => !forbiddenId.includes(item.id));
    return setData(data);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#FEF0BD',
          height: 100,
          width: '100%',
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{height: 100, width: 120}}>
          <Image
            style={{height: 100, width: 100}}
            source={require('../assets/images/drawable-xhdpi/header-icon.png')}
          />
          <View
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              left: 50,
              bottom: 10,
            }}>
            <Text style={{color: '#C82E29', fontFamily: 'badaboom'}}>
              <Text style={{fontSize: 48}}>S</Text>
              <Text style={{fontSize: 24}}>UPERHEROES</Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 24,
            width: 24,
            position: 'absolute',
            bottom: 22,
            right: '10%',
          }}>
          <Image
            style={{
              height: 24,
              width: 24,
            }}
            source={require('../assets/images/drawable-xhdpi/grid-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#C82E29',
          height: 50,
          paddingHorizontal: 32,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          style={{height: 24, width: 24}}
          source={require('../assets/images/drawable-xhdpi/magnifying-glass.png')}
        />
        <TextInput
          placeholder="Where is my superhero…."
          placeholderTextColor="#FACC48"
          style={{fontFamily: 'badaboom', color: '#FACC48', fontSize: 24}}
        />
      </View>
      <View style={{flex: 1}}>
        <Image
          style={{
            flex: 1,
            opacity: 0.25,
          }}
          source={{
            uri:
              'https://www.superherodb.com/pictures2/portraits/10/100/10060.jpg',
          }}
        />
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}>
          <FlatList
            contentContainerStyle={{
              margin: 16,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            numColumns={2}
            data={heroData}
            initialNumToRender={8}
            showsVerticalScrollIndicator={false}
            onEndReached={() => setCount(itemCount + 50)}
            onEndReachedThreshold={0.5}
            // keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <View
                style={{
                  backgroundColor: '#C82E29',
                  borderRadius: 8,
                  margin: 16,
                }}>
                <Image
                  style={{
                    height: 189,
                    width: 142,
                    borderRadius: 8,
                  }}
                  source={{
                    uri: item.url,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'badaboom',
                    color: '#FACC48',
                    fontSize: 24,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
