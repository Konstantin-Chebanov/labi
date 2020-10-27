import React, {useState} from 'react'
import {AsyncStorage, Button, StyleSheet, TextInput, View} from "react-native"
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks"
import {showMessage} from "react-native-flash-message"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import {AUTH} from "../gqls/user/mutations"

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 15
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'stretch',
    }
})

const Login = ({navigation}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const {loading: userLoading} = useQuery(USER, {
        onCompleted: () => {
            navigation.push('BottomRouter')
        },
        onError: () => {

        }
    })

    const [auth, {loading: authLoading}] = useMutation(AUTH, {
        onCompleted: async ({authUser}) => {
            await AsyncStorage.setItem('token', authUser.token)
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            apollo.writeQuery({query: USER, data: {user: authUser.user}})
            navigation.replace('BottomRouter')
        },
        onError: ({message}) => {
            console.log(message)
        }
    })

    const validate = () => {
        if (login === '') {
            showMessage({
                message: 'Введите логин',
                type: 'danger'
            })
            return false
        }
        if (password === '') {
            showMessage({
                message: 'Введите пароль',
                type: 'danger'
            })
            return false
        }
        return true
    }
    const onAuth = () => {
        if (!validate())
            return null
        auth({
            variables: {
                data: {
                    login,
                    password
                }
            }
        })
    }

    if (userLoading || authLoading)
        return (
            <LoadingBar/>
        )
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={text => setLogin(text)}
                value={login}
                style={styles.input}
                placeholder={'Логин'}
            />
            <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                style={[styles.input, {marginTop: 24}]}
                placeholder={'Пароль'}
            />
            <View
                style={
                    {marginTop: 24}
                }

            >
                <Button
                    title={'Войти'}
                    onPress={onAuth}
                />
            </View>
            <View
                style={
                    {
                        marginTop: 24,
                    }
                }

            >
                <Button
                    title={'Регистрация'}
                    style={{paddingTop: 24}}
                    onPress={
                        () => {
                            navigation.push('Registration')
                        }
                    }
                />
            </View>
        </View>
    )
}
export default Login
