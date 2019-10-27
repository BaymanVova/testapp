import React from "react";
import {ImageBackground, Text, TextStyle, View, ViewStyle} from "react-native";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {AuthAsyncActions} from "./AuthAsyncActions";
import {NoHeader} from "../../common/components/Headers";
import {styleSheetCreate} from "../../common/utils";
import LinearGradient from "react-native-linear-gradient";
import {RoundButton} from "../../common/components/UI/RoundButton";
import {AuthInput} from "../../common/components/UI/AuthInput";
import {Title} from "../../common/components/Title";
import {Colors, Fonts} from "../../core/theme";

interface IStateProps {
    isAuthorizing: boolean;
    error: string;
}

interface IDispatchProps {
    login: (login: string, password: string) => void;
}

interface IState {
    login: string;
    password: string;
}

@connectAdv(
    ({auth}: IAppState): IStateProps => ({
        isAuthorizing: auth.isAuthorizing,
        error: auth.error || "",
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        login: (login: string, password: string): void => {
            dispatch(AuthAsyncActions.login(login, password));
        },
    }),
)
export class AuthPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = NoHeader();

    constructor(props: any) {
        super(props);
        this.state = {
            login: "vladika_ept@mail.ru",
            password: "123456",
        };
    }
    private onLoginChange = (login: string): void => {
        this.setState({login: login});
    };
    private onPasswordChange = (password: string): void => {
        this.setState({password: password});
    };
    render(): JSX.Element {
        const {login, password} = this.state;

        return (
            <ImageBackground style={styles.container} source={require("../../../resources/images/main_background.png")}>
                <LinearGradient colors={["transparent", "rgba(243, 233, 216, 0.8)"]}  style={styles.linearGradient}>
                    <View style={styles.inner}>
                        <Title style={styles.title}>{"CoffeTime"}</Title>
                        <Text style={styles.subtitle}>территория кофе</Text>
                        <View style={styles.groupinput}>
                            <AuthInput
                                placeholder={"Email"}
                                value={login}
                                onChangeText={this.onLoginChange}
                            />
                            <AuthInput
                                placeholder={"Password"}
                                value={password}
                                onChangeText={this.onPasswordChange}
                                secureTextEntry={true}
                            />
                            <RoundButton click={this.onLoginPress} disabled={this.stateProps.isAuthorizing}>
                                Вход
                            </RoundButton>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }
    private onLoginPress = (): void => {
        this.dispatchProps.login(this.state.login, this.state.password);
    };
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
    } as ViewStyle,
    inner: {
        flex: 1,
        alignItems: "center",
    } as ViewStyle,
    title: {
        color: Colors.white,
        fontSize: 64,
    } as TextStyle,
    subtitle: {
        fontSize: 16,
        color: Colors.white,
        fontFamily: Fonts.light,
        marginLeft: "22%",
        marginTop: -15,
    } as TextStyle,
    linearGradient: {
        flex: 1,
        paddingTop: "20%",
        paddingBottom: "10%",
    } as ViewStyle,
    groupinput: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    } as ViewStyle,
})
