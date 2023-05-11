import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native'
import { chunk } from 'lodash'

const { width } = Dimensions.get('window')
const gridSize = (width - 32 - 16) / 3

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 0.5,
  },
  tile1: {
    width: gridSize * 2,
    height: gridSize * 2 + 8,
    borderRadius: 6,
  },
  tile2: {
    width: gridSize,
    height: gridSize,
    marginLeft: 8,
    borderRadius: 6,
  },
  tile3: {
    width: gridSize,
    height: gridSize,
    marginLeft: 8,
    marginTop: 8,
    borderRadius: 6,
  },
  tile4: {
    width: gridSize,
    height: gridSize,
    marginTop: 8,
    borderRadius: 6,
  },
})

const MediaView = ({ posts, onOpenPost }) => {

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 16, borderTopLeftRadius: 6, borderTopRightRadius: 6, marginBottom: 100 }}>
        {
          chunk(posts, 3).map((p, index) => {
            if (index === 0) {
              return (
                <View style={{ flexDirection: 'row' }} key={index}>
                  <TouchableOpacity onPress={() => onOpenPost(p[0])}>
                    <Image
                      source={{ uri: p[0]?.photo || p[0]?.thumbnail }}
                      style={[
                        styles.tile1,
                        index === 0 && { borderRadius: 6 },
                      ]}
                    />
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity onPress={() => onOpenPost(p[1])}>
                      <Image
                        source={{ uri: p[1]?.photo || p[1]?.thumbnail }}
                        style={[
                          styles.tile2,
                          index === 0 && { borderRadius: 6 },
                        ]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onOpenPost(p[2])}>
                      <Image
                        source={{ uri: p[2]?.photo || p[2]?.thumbnail }}
                        style={styles.tile3}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={{ flexDirection: 'row' }} key={index}>
                  <TouchableOpacity onPress={() => onOpenPost(p[0])}>
                    <Image
                      source={{ uri: p[0]?.photo || p[0]?.thumbnail }}
                      style={styles.tile4}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onOpenPost(p[1])}>
                    <Image
                      source={{ uri: p[1]?.photo || p[1]?.thumbnail }}
                      style={[styles.tile4, { marginLeft: 8 }]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onOpenPost(p[2])}>
                    <Image
                      source={{ uri: p[2]?.photo || p[2]?.thumbnail }}
                      style={[styles.tile4, { marginLeft: 8 }]}
                    />
                  </TouchableOpacity>
                </View>
              )
            }
          })
        }
      </View>
    </ScrollView>
  )
}

export default MediaView
