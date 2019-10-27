import React, {PureComponent} from "react";
import {ScrollView, View, Text, ViewStyle, TextStyle} from "react-native";
import {Colors, CommonStyles} from "../../core/theme";
import {showInDevAlert} from "../helpers";
import {localization} from "../localization/localization";
import {MainButton} from "../components/MainButton";
import {ButtonType} from "../enums/buttonType";
import {Drink} from "../components/Drink";
import {Ingredient} from "../components/Ingredient";
import {styleSheetCreate} from "../utils";
import {UserClientRequest, UserRequest, ProductBriefInfo, ProductClientRequest} from "../../core/api/generated/CoffeeReqiest";
import {Cafe} from "../components/Cafe";
import {CafePage} from "../../modules/CafePage/CafePage";

interface IState {
    allCafe: ProductBriefInfo[] | null;
}

export class Playground extends PureComponent<IEmpty, IState> {
    constructor(props: IEmpty) {
        super(props);
        this.state = {
            allCafe: null,
        };
    }

    componentDidMount(): void {
        let id: string | null = "";
        console.log("componentDidMount");
        const data: UserRequest = new UserRequest({
            email: "vladika_ept@mail.ru",
            password: "123456",
        });
        const request: UserClientRequest = new UserClientRequest();
        request.authorization(data)
            .then(response => {
                id = response ? response : "";
               /* const cafeRequest: CafeClientRequest = new CafeClientRequest();
                cafeRequest.getAll(id)
                    .then(responseCafe => {
                         const allCafe: CafeInfo [] | null = responseCafe;
                         this.setState({allCafe: allCafe});
                        console.log("кафешки", responseCafe);
                    });*/
                const cafeRequest: ProductClientRequest = new ProductClientRequest();
                cafeRequest.getAll(id)
                    .then(responseCafe => {
                        const allCafe: ProductBriefInfo [] | null = responseCafe;
                        this.setState({allCafe: allCafe});
                        console.log("кафешки", responseCafe);
                    });
                console.log(response);
            })
            .catch(error => console.log(error));
    }

    render(): JSX.Element {
        let cafe1: JSX.Element[] = [];
        //@ts-ignore
        if (this.state.allCafe) {
            cafe1 = (
                this.state.allCafe.map( (item: ProductBriefInfo) => {
                    return (
                        <Drink
                            id={item.id}
                            cofeeId={item.cofeId}
                            name={item.name}
                            price={item.price}
                            favorite={item.favorite}
                            imagePath={item.imagesPath}
                            key={item.id}
                        />
                    );
                })
            );
        }

         return (
            <ScrollView style={CommonStyles.flexWhiteBackground}>
               <View style={{flex: 1, flexDirection: "row", flexWrap: "nowrap", justifyContent: "flex-start"}}>
                    <Ingredient
                        id={"1"}
                        description={"15мл"}
                        iconType={"milk"}
                    />
                    <Ingredient
                        id={"1"}
                        description={"25%"}
                        iconType={"coffee"}
                    />
                    <Ingredient
                        id={"1"}
                        description={"25мл"}
                        iconType={"water"}
                    />
                    <Ingredient
                        id={"1"}
                        description={"95*"}
                        iconType={"temperature"}
                    />
                </View>
                <Cafe
                    name={"Caffee"}
                    address={"daadadadad "}
                    coordinates={"dadadadad"}
                    description={"dadad"}
                    images={"https://pmr.md/images/firm/foto/d0/d03ce518.jpg"}
                />
                <Cafe
                    name={"Caffee"}
                    address={"daadadadad "}
                    coordinates={"dadadadad"}
                    description={"dadad"}
                    images={"https://pmr.md/images/firm/foto/d0/d03ce518.jpg"}
                />
                <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap", paddingLeft: 10}}>
                    {cafe1}
                </View>


                <MainButton type={ButtonType.Action} onPress={showInDevAlert} title={localization.common.ok}/>
                <MainButton type={ButtonType.Negative} onPress={showInDevAlert} title={localization.common.ok}/>
                <MainButton type={ButtonType.Positive} onPress={showInDevAlert} title={localization.common.ok}/>
                <MainButton type={ButtonType.Neutral} onPress={showInDevAlert} title={localization.common.ok}/>
                <MainButton type={ButtonType.Transparent} onPress={showInDevAlert} title={localization.common.ok}/>
                {this.renderContentInfo("MainButton (Border)")}
                <MainButton type={ButtonType.Border} onPress={showInDevAlert} title={localization.common.ok}/>
            </ScrollView>
        );
    }

    private renderContentInfo = (title: string): JSX.Element => {
        return (
            <React.Fragment>
                <View style={styles.contentContainer}/>
                <Text style={styles.title}>{title}</Text>
            </React.Fragment>
        );
    };
}

const styles = styleSheetCreate({
    contentContainer: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: "purple",
    } as ViewStyle,
    title: {
        color: Colors.black,
        textAlign: "center",
        marginVertical: 10,
    } as TextStyle,
    colorContainer: {
        alignItems: "center",
        justifyContent: "center",
    } as ViewStyle,
    colorItem: {
        width: 100,
        height: 100,
    },
});
