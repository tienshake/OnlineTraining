import { useContext, useEffect, useState } from "react";
import "./chatBot.css";
import { ChatBotContext } from "../../context/Context";
import { USER_ASK_BOT, BOT_REPLY_USER } from "../../context/Types";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

export default function ChatBot() {
  const userRedux = useSelector((state: RootState) => state.auth.user);
  const { handleCloseChatBot, welcome, talkContent, dispatch } =
    useContext(ChatBotContext);
  const [valueInputMessage, setValueInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /*  */
  const handleChangeMessage = (e: any) => {
    const value = e.target.value;
    setValueInputMessage(value);
  };

  const handleSubmitMessage = async () => {
    setValueInputMessage("");

    const stringEmpty = valueInputMessage.replace(/\s/g, "");
    console.log(stringEmpty, "stringEmpty");

    const regex = /@([^!]+)/;
    const match = valueInputMessage.match(regex);
    const resultKeyCourse = match ? match[1] : null;

    console.log(resultKeyCourse, "result");

    if (stringEmpty.length > 0) {
      const data = await axios.post(
        `https://nodejs-deploy-n9mo.onrender.com/chat-bot/ask?idUser=${
          userRedux.id
        }&keyWordCourse=${resultKeyCourse ? resultKeyCourse : ""}`,
        { queryText: valueInputMessage }
      );

      dispatch({
        type: USER_ASK_BOT,
        payload: valueInputMessage,
      });

      if (data) {
        setLoading(false);
        dispatch({
          type: BOT_REPLY_USER,
          payload: data.data.respone,
        });
      }
    }
  };

  return (
    <>
      <div className="wrapper_chatBot">
        <div id="chatApp">
          <div className="chatBox" id="chatBox">
            <div className="card">
              <header
                className="card-header header-title" /* @click="toggleChat()" */
              >
                <p
                  onClick={handleCloseChatBot}
                  style={{ cursor: "pointer" }}
                  className="card-header-title"
                >
                  X
                </p>
                {/* <a href="" className="card-header-icon"> */}
                <span className="icon">
                  <i className="fa fa-close"></i>
                </span>
                {/* </a> */}
              </header>

              <div id="chatbox-area">
                <div className="card-content chat-content">
                  <div className="content">
                    {/* welcome */}
                    <div className="chat-message-group">
                      <div className="chat-thumb">
                        <figure className="image is-32x32">
                          <img
                            style={{ width: "50px" }}
                            src="https://media.istockphoto.com/id/1250000899/vector/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-vector.jpg?s=612x612&w=0&k=20&c=xj8GkmfFYH_Frho_pJ0HL2dkDwbZAI0Of6KwKdVsh1s="
                            alt=""
                          />
                        </figure>
                      </div>
                      <div className="chat-messages">
                        <div className="message">{welcome}</div>
                        <div className="from">seen 04:55</div>
                      </div>
                    </div>

                    {talkContent.map(
                      (
                        content: { role: string; message: string },
                        index: number
                      ) => (
                        <div key={index}>
                          {content.role === "user" ? (
                            <div className="chat-message-group writer-user">
                              <div className="chat-messages">
                                <div className="message">{content.message}</div>
                                <div className="from">Đã xem</div>
                              </div>
                            </div>
                          ) : (
                            <div key={index} className="chat-message-group">
                              <div className="chat-thumb">
                                <figure className="image is-32x32">
                                  <img
                                    style={{ width: "50px" }}
                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhIPFBIXFxAYEhAWEBYXFhQZGRYZGBgXGBYWGBQbHikhGRsnHBcWIjIjJiosLy8wGCA1OjUtRSkuLywBCgoKDg0OHBAQGy4mISYsMC4uLi4uLi4wLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUBAgj/xABEEAACAQIBBwgGCAQGAwEAAAAAAQIDEQQFBhIhMUFRBxMiYXGBkaEjMlKCscEUQmJykqLC0VOy4fAkMzRDc9Jjk+IV/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAMEBQIB/8QAMBEAAgEDAQQHCQEBAAAAAAAAAAECAwQREhMhMUFRYYGRobHRBRQiIzJCceHwwVL/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByMs5wUMMvSz6drqEdc37u7tdkQXK2f9ad40YqlHi7Sn56l4PtJqdvUqcFu6SCrcU6f1Pf0FmV60YLSnJRjvcmkvFnCxeeeDp6ue03whGUvzJW8ypcViqlWWlUnKcuMpN+F9hiLkbCP3PuKU7+X2r/Syq/KPQXqUqku3Qj82asuUrhhfGr/8FfnhMrOl0eLIXeVunwX+lhR5Slvwr7qt/wBBt0OUag/XpVI9a0JL4p+RWR6HaUny8WFeVlz8EXFhM78JU1KsovhNSh5yVvM7dKopJSi009jTTT7ygjPgsdVovSpVJQf2ZNX7VsfeQzsF9r7yeF+/uXcX0CsskcoNWFo14KpH242jPvj6svIneScs0cRHSpVFJr1o7JR7YvWu3YUqlCdPfJbuku0rinU+l7+g6QAIiYAAAAAAAAAAAAAAAAAAAGplDHQo05VaklGEVrfwSW9vgDxvG9mavWjCLnJpRSvJt2SXFsrzOTPyUr0sN0Y7HVa1v7iexdb19hw8585qmLlbXGgn0KfHhKfF+S8zhGlQs0vinx6DLr3jlup7l0ntSbk3KTbk3eTbbbfFt7TwAvlEAAAH1H+/mfJt5Ho6delBq6c43XFJpvyuVryltaEoZxleRbsK+wuYVMZw+H5TXhk1ZM8N3LtFQxNaKVkptpLYk7SVl3mkeWVLZUIxznd578dh17RuNvczqYxvx3bs9oABaKQPuhWlCSnCTjNO8ZRbTXY0fAALBzaz8valibJ6kqqVk/vrd2rV1InkJppNO6etNbGuNygiS5p52TwzVKpeWGb2bXT64dXGPh159ezT+Kn3ehoW9418NTv9S3AYMNiI1IRqQkpQkk4tbGjOZxpgAAAAAAAAAAAAAAGHE1404SqTajCKbk3sSW1lQZ1ZwyxdXVdUIt81D9cvtPy8b9jlEzg05/Q6b9HB+ma+tNfV7I/HsIWalpQ0rXLjy6jKvLjU9EeC4gAF0ogAAAHtODk1GKbk3ZJJtt8EltJhkfMSpO068ubj7EbOfe9kfMjqVYU1mTwSU6U6jxFZIY2WbknMqlSlTrc7Uc0k7dDRu422Wvv4nSwWa+FpWtQjJ8anTf5tS7kddIzLi81rEMpc+s1LazUHqqYb5dRGcqZl0a1SdV1ailJLUtC10klqtfct5WBetjk43NnDVb6VCKftQWg+3o2v3nltduC0zy1y6hc2aqPVDCfPrKhBMssZhTjeeHnpr2JWUu6WyXkQ+rSlGThKLjJO0k000+tM1KdaFRZizLqUp03iSPkAEhGAAASXM3OZ4afN1G3hpPpf+Nv666uK7+22Kc00mndNJprY09jKBLB5Ocv3/wAHUe5ug3wWt0+7W138EULu3ytpHtNCzuMPZy7PQsEAGaaYAAAAAAAAAOFndlj6Nh5TT9JLoUvvPf3K77kd0qXlBypzuJdNPoUU4L73+4/Gy90nt6W0mk+BXuauzp5XHgRhu+t63vb3gA2jEAAABnyfgp16kaVON5y2cEt7b3JGGKbaSV22kktre5JFrZpZBWFpdJenmk6r4cIJ8F5vuK9xXVKOeb4Fi2oOrPHJcf7rPvN3Nynho3XSrNdOo14qPsx+O87YBhyk5PVJ7zcjCMFpitwPADk6B6eAA9OPnDm/SxUel0aqXQqJa11P2o9XgdgHUZOL1R4nkoqS0y4FJ5TyfUoVJUakbSXhJbpRe9M1i2c6MiRxNJrUqsbulLr9lvg/2ZU84NNxatJNpp7U1qaZt21dVY9a4mHc27oyxyfD0PAAWSsD6o1ZQlGcXacWpRa3NO6Z8gAu3N/KixNCFdam1aa9ma1SXj5NHUKw5NMqaFaWGb6NRaUPvxXzjf8ACizzEr09nNx5cjdt6u0pqXPmAAQkwAAAAABp5Vxio0atZ7IQlLtaWpd7sii5zcm5N3k23J8W9bZaXKVi9DCKnvqVYRfZG835xXiVYadjDEHLpfkZV/LM1HoXmAAXiiAAASnk+yXztd15LoUrNdc3fR8Em+2xZpwMx8HzeEpv61S9SXver+VRMmdGWfo9NaP+bO6p9Vts2uq6732mFdVNpVfVu7v2btrT2dJde828p5Xo4deknaW6K1yfurYut2RG8Vnx/Do6tznL9Mf3IhVqOUnKTbk3eTbu2+tnyRqCJtTJDUzyxL2c3Hsg/m2YXnZiv4i/BD9jiA60o8yztrOzFfxF+CH7GannliVt5uXbF/JojwGlDLJjhc+P4lHvhL9L/ckeTcsUa69HO72uL1SXuv4oqs8dSUenGTjJNOLTs01vTOXBHuplwFecoWS9CrHERXRqap9U0tvev5WSbNLLn0mk1L/OhZT+0nsml1679aMud+D53CVlbXFace2Gt/l0l3ndtUdOqn2PtI7qmqlJrtRU4AN4wAAADPgsVKlUp1o+tCcZLrs7279heuHrKcYzi7xklKPY1dFBlwZiYvnMFSvtjpQfuu0fy6JQv4ZSl2GhYTw3HtJCADNNMAAAAAArrlVrdLD0+Easn3uKXwZAyYcqEv8AFU1woR85z/Yh5tWqxRj/AHMw7p/Ol/cgACcgDJ3kvINCVGlKVJOUoQlJty1tpN7+sgjLNyR/kUf+Kl/KjP8AaM5RjHS2t/L8Gj7NhGUpaknu5kkw9JQjGCVoxiopcElZIrrPHEueKqLdBRhHuV35yZZJVWXv9TiP+ap8XYzYcTTlwNA4OVMtuM3Thq0XaUrJ3e9JXO8QadTW7yle7v2795KiNkkyPlbnW4S9dK6drXW/Vd6zqkRyNP09O0pPW9vDRd95LmGECPY/LzUnGm7RTavop6Vt+t6kd6tfRlbboyt4EHVT7cv794IMlOR8qc8nF6pq1911xSudCpsfYyL5vzvXj0m+jO9+Fu177EonsfYwz1HQzLxTp4ulwnpU5d6uvzKJZ84JpxaummmuKeplR5A/1OH/AOal/Mi3iGpxJIcCB5w5EoU6FScKajOOjZpy9pJ7XwZCyxM6/wDTVvc/niV2avs+cpUm5PO9/wCGR7QhGNRKKxu9QAC8UQWRyV1r0a1PhUjL8UbfoK3J5yUS6WJX2aD8HU/crXazRfZ5lmzeKyLFABjm0AAAAAAVbyox/wAVTfGhH+eZECdcqtH0mHnxhUj+Fxf6mQU2rV5ox/uZh3SxVl/ckAATkAJhk7OmjClTpyjPSjThF2UWuiranfqIeeENahCqkp8iajXnRbcOZd2AxKq0qdWPqzhGSvt1q+vrK7ztoaGKq8JOM13xV/O5JOTzH6eG5pvpUpNe7K8ovx0l3GDP/A3VPEJbPRz7G7wfZfSXvIxpR2dRw/uo24T101PpIUR/KmSJ6bnTbabu4pq6b27WtRIAeg5GRsmSpvnJt6VrRjfZxb1tXOuAACN4/I1RSbpuTg3dJNdHq1yWokgAOZkbJrpXlN3m1a3srht2/sb9Z9FmQ18TLcAdLM+hp4uit0XKb92La87eJaGKrqnCdSXqxjKT7Em38CH8nWT7KpiWtvo6fYtc346K7mdPPvHc3hZQT6VWSguzbN9llb3jhR11FE9lLZ03J/kjeW85KVahOlGMtKWjtUUlaSfF8CKnh6blKjClHTEwq1adWWqYABKRAnfJSuniX9mgvF1P2IIWLyVUfR16nGpCP4Yt/rK128UX2eZZtFmsu3yJ4ADHNoAAAAAAhnKdhdLCwqr/AG6qv2STj8dErEvDL2C5/D1qO+UHo/eWuP5kijzUsZZg10PzMm+hiopdK8gAC6UgAADtZpZX+jV4yk/RS6FXqTeqXc9fZctPFUY1YSpyV4Si0+x70+O8pIn2Y2cSlGOEqvprVRk/rL2O1buK7NedfUG/mR5cfx+jRsLjS9nLnw/P7I7lTJ8qFWVKW71XulHdJf3tuahZ+WckwxENCWqSu4TW2L+a4ornKuAqYaehVi0m+jNa4y7JceraUIyyaTjg0cTX0Iubi2lt0dbS423mtSyvRlsqJdt18TcVRcTlY3IlKb0oy0G9trNfh/Y7OWbsso0V/uw/EmeYbHRqNqCbivWlay7FfW2cujkCCd51NJcEred2daE4wSjCNkti3AGxUnZfA8yVk+eIqxpQ2t3k90Y75Pq/oj7yXkuriJ6NON/ak9UY9r+W0svIWRaeGp6Edc3Z1JvbJ/JLcjiUsHUY5NzBYWNKnClBWhGKS/d9bevvKyzxyt9IxD0XelTvCn1+1LvfkkSfPfOJU4vC0n6WStVa+pF7vvNeC7UV2XrGhj5kuz19O8zr+vn5ce309e49ABpGaAAAC2+T3C6GCpvfOU6j73oryiipqNGU5RhFXlKUYxXW3ZebL3wWGVKnTpR9WEIxXZFJfIo308RUen/C/YR+Jy6N3ebAAMw1AAAAAAAU5nvkzmMVUsuhU9LD3n0l3Sv3NFxkYz8yNz+Hcoq9WlecOLX1496V+2KLFrV0VN/B7itd0tpT3cVv/uwqUAGyYoAAACdta27gACd5tZ5ppUcQ7PZGrufVPg/teNtpMatOFWFpKM6clsdpRkt3Uykzo5Ky5Xw/+XUejvg9cH3PZ3WM+vYqW+G7q5fo0KF+4rFTf18/35/kmmUMxqM7ulOVN8PXj4N3XicirmJiF6tSlJdbmn4aL+Ju4LP+NrVqLvxptP8ALK1vE+ocqGTtkqs4PepUamr8KaKE6dan9SNCnVpVPpZoUsxMQ/WqUkupzb8NFHXyfmNRjZ1ZyqPguhHyd/M16vKjk5bK05dUaNT9SSOdHlTp1ZSjh8PPUm9OrKMUuHQi3fxWw8jGpNqKO5ShBOT4IsCjRhTjoxjGEEtiSSXWRHOTPOMU6WHelPZKr9WP3PafXs7SKZVy9XxGqpU6HsR6MfDf33OYX6FiovVU39XLt6fIza9+5LTT3dfP9ef4EpNtttttttvW23tbYANEzgAAAAEty27kASrk6yZzuJ55roUVpe+7qC/mfci1zh5pZH+jYeFNr0kunV+893crLuO4YtxV2lRtcOCNy2pbOmk+PMAAgJwAAAAAAAACpc+cg/R6vOwXoKjbjbZCe2UOpbWu9biMF65TwMK9OdGavCSs+K4NPc09ZTWXcj1MNVdGezbTlunHivmtxq2lfXHQ+K8UZF3Q0PWuD8Gc8AFwpgGXDYedSShCDlN7IxTbOrTzSxb18zZfanTX6jiVSEfqaXajuNOUvpTf4TOICQrM/Eb9Be+n8Ez5nmnVW2pSXbOX/Uj96o/9LvJFa1n9jOAyFTpa3ayV3qvs6rlm1cgNJ3xOHWp/7v8AQrZS7Cpc1YVMaHkvWtGdPOtYzgwc0+KOxm5C1ST2vQ2p7Na3f3sOfpdaOzmphudruPOU4ejk9KctGO2Oq/HX5EVKUYzTfAmrRcqbjFbzsA7UM3Jv1cRQfZUb+ETMsz6z2Spvsk/+pf8Ae6H/AGjM90r/APDI+DvvM/E7oxfZOHzsYK2a2LiruhJr7LhLyi2ztV6T4SXejh0Kq4xfczjgNWbTVmtTT3dVgSkQJnyeZB5yp9LqL0dN+iT+tNfW7I/HsOHmzkGeLq6CuqUbOrPguC+093iXHhcNGnCNOEdGEUlFLckUruvpWhcXx6i7Z2+p65cF4szgAyzWAAAAAAAAAAAABy8u5Hp4qk6VRdcJLbGXFftvOoD1Np5R40pLD4FHZbyNVw1R06i1a9Ca9Wa4p/LcfGRslTxNVUods5PZCO+T/beXPlLJ1OvB0qkFKD8U+Ke1PrOVkHN2OEjUUZOWlO+k1Z6KXRi7cNevrL3v3y3u+Lw/Jn+4/MW/4fE+8lZHp4enzdJWk10pvXKT4t/LYjl5fwmKlC1CajUvrcle64KVno+HgSQGXJuTy+JrRSisJbioMdkfHtvT5yfZU0l+FP5HKqZHrL1qNT/1z+Ni82j5dGPsrwR7qZ1koeWCa2xku2LXyOdLI/2n3x/qfof6PH2fifLwsPZ82e7RnLSfE/PP/wCR9v8AL/U2MLkzRd7t6rbC/wD6HD2fNhYWHs+bPdqwoxRRkcnTeynN9kG/kbWHyJidsKVVPjoyj5uxdSoR9lH0qUfZXgjlyZ1lFZZKyVlJNWquK4VJqf5el8ifYOlVSV3rstJ7E3vtE6R5JnL3nmSOZzZtwxKc4pRr21S3S6p8e3avIheRM2q2IrSpaLhGErVZtao8UuMurvLZhh3LbqRtwppKyVi5QuqkI6e7qKVe1p1JqXf1mpkvJ1PD040acbRXi3vlJ72zeAIm872TJJLCAAPD0AAAAAAAAAAAAAAAAAAxTpJ9RgnTaNwHLjk9TZoA3JU09xjdBcTnSzrUa4MzoPijzmGeYZ7lGIGXmGerDviMMZRhBsLDoyRglsR6os81GtCk2Z4UUte1mUHSikctgAHR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k="
                                    alt=""
                                  />
                                </figure>
                              </div>
                              <div className="chat-messages">
                                <div className="message">{content.message}</div>
                                {/* <div className="message">Caro marinho</div> */}
                                <div className="from">Hoje 04:55</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}

                    <div className="chat-message-group">
                      {loading ? <div className="typing">spending</div> : null}
                      <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <footer className="card-footer" id="chatBox-textbox">
                  <div style={{ width: "100%" }}>
                    <textarea
                      value={valueInputMessage}
                      onChange={handleChangeMessage}
                      id="chatTextarea"
                      className="chat-textarea"
                      placeholder="Nhập tin nhắn"
                    ></textarea>
                  </div>
                  <div
                    className="has-text-centered"
                    style={{ width: "100%", background: "#fff" }}
                  >
                    <a className="button is-white">
                      <i className="fa fa-smile-o fa-5" aria-hidden="true"></i>
                    </a>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={handleSubmitMessage}
                      className="button is-white"
                    >
                      Gửi
                    </p>
                  </div>
                </footer>
              </div>
            </div>
          </div>
          <div className="emojiBox" style={{ display: "none" }}>
            <div className="box"></div>
          </div>
        </div>
      </div>
    </>
  );
}
