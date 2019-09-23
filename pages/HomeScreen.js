import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, Badge ,Icon} from 'native-base';
import loading from '../assets/loading.gif';
import Heading from '../components/Heading';
import MangaList from '../components/MangaList';
import Manga from '../components/manga/Manga';

export default class HomeScreen extends React.Component {
      constructor() {
        super();
        this.state = {
          mangaData: null,
          loaded: false,
          page: 0, // change page,
          manga: null,
        }
    
        // binding
        this.displayMangas = this.displayMangas.bind(this);
        this.uiToggle = this.uiToggle.bind(this);
        this.toggleMangaView = this.toggleMangaView.bind(this);
      }
      componentDidMount() {
        const url = 'https://www.mangaeden.com/api/list/0/?p=1';
        fetch(url)
          .then(res => {
            if(!res.ok) throw Error(res.statusText);
            return res.json()
          })
          .then(res => {
            this.setState({
              mangaData: res.manga,
              loaded: true
            })
          })
          .catch(err => console.log('err fetching ', err))
    
      }
    
      displayMangas() {
        return this.state.loaded?
          this.uiToggle()
          : <Image source={loading} style={styles.loading} />
      }
    
      // conditionally render all mangas or an individual manga
      uiToggle() {
        return this.state.manga? 
          <Manga data={this.state.manga} toggleMangaView={this.toggleMangaView} />
        : <MangaList data={this.state.mangaData.slice(0, 30)} toggleMangaView={this.toggleMangaView} />
      }
    
      toggleMangaView(manga) {
        this.setState({
          manga: this.state.manga? null : manga,
        })
      }
    
      
    
      render() {
        return (
          <Container>
          <ScrollView>
          
          <View style={styles.container}>
            {/* <Image source={require('../image/index.png')}style={{width: 420, height: 200}}/> */}
            {this.displayMangas()}
          </View>
        </ScrollView>
          <Footer>
                    <FooterTab style = {{backgroundColor : '#1e90ff'}}>
                      <Button vertical onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <Icon name="home" />
                        <Text>Home</Text>
                      </Button>
                      <Button vertical onPress={() => this.props.navigation.navigate('Search')}>
                        <Icon name="search" />
                        <Text>Search</Text>
                      </Button>
                      <Button vertical onPress={() => this.props.navigation.navigate('Register')}>
                        <Icon name="create" />
                        <Text>Write</Text>
                      </Button>
                      <Button vertical onPress={() => this.props.navigation.navigate('Profile')}>
                        <Icon name="person" />
                        <Text>Phofile</Text>
                      </Button>
                    </FooterTab>
                  </Footer>
        
        </Container>
        );
      }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(24, 31, 38)',
    alignItems: 'center',
    paddingTop: 40,
  },
  loading: {
    // width: 50,
    flex:.5
  },
});
