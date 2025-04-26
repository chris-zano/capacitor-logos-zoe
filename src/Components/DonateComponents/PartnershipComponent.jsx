import React, { useState } from "react";

import girl from "/src/assets/images/girl-in-hoodie-2.jpg";
import manInbarCode from "/src/assets/images/man-in-barcode.jpg";
import mangreyedOut from "/src/assets/images/man-greyed-out.jpg";
import online from "/src/assets/images/online-discipleship.jpg";
import intercessory from "/src/assets/images/intercessory-prayer.jpg";
import podcast from "/src/assets/images/podcast-production.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const Partnership = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Partnership");

  const switchTabs = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      {/* Navigation Tabs */}
      <section className="nav-tabs">
        <button
          type="button"
          className={`nav-tab left-tab ${activeTab === "Partnership" ? "focused" : ""}`}
          onClick={() => switchTabs("Partnership")}
        >
          Partnership
        </button>
        <button
          type="button"
          className={`nav-tab right-tab ${activeTab === "One Time" ? "focused" : ""}`}
          onClick={() => switchTabs("One Time")}
        >
          One Time
        </button>
      </section>

      {/* Partnership Section */}
      {activeTab === "Partnership" && (
        <section className="partnership">
          <div className="articles-group">
            <Article
              navigate={navigate}
              imgSrc={girl}
              imgAlt="why partner"
              title="Why Partner With The Logos Zoe"
              content={`
                    If there was a time mankind needed God’s intervention, it is today.

                    If there was a time in which iniquity abounded, it is today.

                    The Great Commission given to us by Jesus Christ to go and proclaim the gospel to all nations is
                    a huge task, but not impossible. To fulfil this great commission, everyone who looks forward to
                    the second coming of Christ must minister according to the proportion of grace given to us. Some
                    of us have been given the grace of finance. We must minister that grace purposefully to the
                    glory of God. Others have the grace of time to volunteer for the gospel, etc.

                    Precious one, some must plant. Others must water. However, it is God who always gives the
                    increase. The Logos Zoe is in response to the Great Commission of our Lord Jesus Christ for
                    our days. Aggressively, we must win our generation for Christ. Our world needs help; our world
                    needs hope. Jesus is the answer to our world today; he is the hope of mankind. Your partnership
                    will go a long way toward bringing this world the answer it seeks and the hope it needs, right
                    to its door. You can be the means by which the gospel (God’s power of salvation) reaches our
                    restless youth, ailing mothers and fathers, depressed society, and violent communities.
                `}
            />

            <Article
              navigate={navigate}
              imgSrc={manInbarCode}
              imgAlt="how to partner"
              title="How To Partner"
              content={`
                    To partner with The Logos Zoe, you have options to choose from. You also have the
                    opportunity to decide an amount you can consistently give (either weekly or monthly) to enable
                    the project to fulfil the Great Commission with you. As a partner, you will get access to our
                    monthly statistics detailing how far we are reaching out and the impact this partnership is
                    having on souls around the world.
                `}
            />

            <Article
              navigate={navigate}
              imgSrc={mangreyedOut}
              imgAlt="blessings of partnership"
              title="The Blessings Of The Partnership"
              content={`
                    The fear of the Lord is the beginning of wisdom (Proverbs 9:10), but he that wins a soul is wise
                    (Proverbs 11:30). If there is any great thing we can do for God, it is to use the means he has
                    given us to win a soul. The value of a soul is priceless, and the one who gives God such a
                    priceless gift of a soul, definitely will have the blessings of God springing up in his life in
                    a special way.

                    Every seed sown for the saving of a soul is a seed of righteousness. One soul saved can have an
                    impact on an entire generation. Consider Apostle Paul and his work of ministry to date. Now look
                    at this – what you could have used to buy bread for your daily meal, you sow it as a seed to
                    bring a soul to Christ. Wouldn’t the same God who supplies seed to the sower and bread for food
                    multiply your seed sown and the fruits of your righteousness? (2 Corinthians 9:10)

                    Anyone who leaves his home behind and chooses me over children, parents, family, and
                    possessions, all for the sake of the gospel, will come back to the person a hundred times in
                    this lifetime. (Mark 10:29–30). The same money you put into this partnership will come back to
                    you a hundred times. You can trust this because God said it, and it was said as one of the
                    reward systems He has for His people.

                    Thus says the Lord of Hosts, “My cities through prosperity shall yet be spread abroad."
                    (Zechariah 1:17). God’s prosperity has a purpose. This is why the eyes of the Lord are running
                    to and fro throughout the whole earth, to show himself strong on behalf of those whose hearts
                    are perfect towards him (2 Chronicles 16:9). As your heart is tuned towards winning souls, your
                    heart is perfect towards God. This is why, with this partnership, God’s financial strength will
                    be your portion.
                `}
            />
          </div>

          {/* Partnership Options */}
          <div className="options-group">
            <div className="section-title-small">
              <h3 className="opt-title">Partnership Options</h3>
            </div>
            <ul>
              <PartnershipOption
                imgSrc={online}
                imgAlt="partner option"
                title="Online Discipleship"
                content="
                      The Great Commission emphasises the importance of
                      disciplining the nations. Our online discipleship
                      programme is built on a cutting-edge Learning Management
                      System (LMS) that provides newly born-again Christians
                      with the knowledge they need to mature in the faith. Your
                      partnership allows us to add a one-on-one session to the
                      LMS, where experienced instructors can work with students
                      individually. Thus, experienced believers are employed to
                      counsel, direct, correct, instruct and coach these new
                      Christians in righteousness. Our growing number of new
                      believers necessitates that we scale up our discipleship
                      program to include various translations of our
                      discipleship resources. This is the only way our resources
                      can best speak to new believers whose native language is
                      not English. Your partnership means a lot to The Logos Zoe
                      and the gospel reaching the nations of the world.
                    "
              />

              <PartnershipOption
                imgSrc={intercessory}
                imgAlt="partner option"
                title="Intercessory Prayer For Souls"
                content="
                      To win the world, we must constantly intercede for the
                      world. The church prayed for Peter constantly when he was
                      arrested and imprisoned to be killed. It was only a matter
                      of time before Peter received his deliverance. The Logos
                      Zoe is continually expanding its full-time prayer warriors
                      to handle the prayer needs of those our work ministers to.
                      The team of prayer warriors is constantly interceding for
                      the salvation of men and women all over the world. Your
                      partnership enables the project to maintain existing
                      full-time prayer warriors, while enlarging the team to
                      meet the ever-increasing demand for prayer by new
                      believers, especially in difficult regions of the world.
                      We believe some men would be saved by a Damascus encounter
                      when we pray. Your partnership means a lot to The Logos
                      Zoe and the gospel reaching the nations of the world.
                    "
              />

              <PartnershipOption
                imgSrc={podcast}
                imgAlt="partner option"
                title="Broadcast Production & Distribution"
                content="
                      The Word of Faith Podcast is a 10-minute podcast where the
                      unadulterated word of God is shared and distributed daily
                      to the phones and tablets of subscribers at no cost. We
                      believe that one word from God can contain an entire
                      life-changing formula. Our inspirational videos and wisdom
                      nuggets are Holy Ghost-filled messages to inspire and help
                      believers to navigate their lives in this changing world.
                      The end is near and the message of the gospel must be
                      preached in all nations of the world. Our salvation
                      messages are meant to help those who are at the ends of
                      the world to encounter Christ. This is why getting the
                      word of God to places where Christ is not known in audio
                      and video formats is important. In this way, those who
                      cannot read can still appreciate the word of God. Further,
                      we can get our podcast content onto online radios to
                      enable us reach many more with the gospel of Christ. Your
                      partnership will enable the production to keep up the good
                      work, as well as employ innovative ways of distributing
                      the audio messages they produce around the world. Your
                      donation means a lot to The Logos Zoe and the gospel
                      reaching the nations of the world.
                    "
              />
            </ul>
          </div>
        </section>
      )}

      {/* One Time Section */}
      {activeTab === "One Time" && (
        <section className="one-time">
          <div className="options-group">
            <div className="section-title-small" style={{ marginTop: "3rem" }}>
              <h3 className="opt-title">One Time Donation Options</h3>
            </div>
            <ul>
              <OneTime
                imgSrc={online}
                imgAlt="partner option"
                title="Online Discipleship"
                content="
                      The Great Commission emphasises the importance of
                      disciplining the nations. Our online discipleship
                      programme is built on a cutting-edge Learning Management
                      System (LMS) that provides newly born-again Christians
                      with the knowledge they need to mature in the faith. Your
                      partnership allows us to add a one-on-one session to the
                      LMS, where experienced instructors can work with students
                      individually. Thus, experienced believers are employed to
                      counsel, direct, correct, instruct and coach these new
                      Christians in righteousness. Our growing number of new
                      believers necessitates that we scale up our discipleship
                      program to include various translations of our
                      discipleship resources. This is the only way our resources
                      can best speak to new believers whose native language is
                      not English. Your partnership means a lot to The Logos Zoe
                      and the gospel reaching the nations of the world.
                    "
              />

              <OneTime
                imgSrc={intercessory}
                imgAlt="partner option"
                title="Intercessory Prayer For Souls"
                content="
                      To win the world, we must constantly intercede for the
                      world. The church prayed for Peter constantly when he was
                      arrested and imprisoned to be killed. It was only a matter
                      of time before Peter received his deliverance. The Logos
                      Zoe is continually expanding its full-time prayer warriors
                      to handle the prayer needs of those our work ministers to.
                      The team of prayer warriors is constantly interceding for
                      the salvation of men and women all over the world. Your
                      partnership enables the project to maintain existing
                      full-time prayer warriors, while enlarging the team to
                      meet the ever-increasing demand for prayer by new
                      believers, especially in difficult regions of the world.
                      We believe some men would be saved by a Damascus encounter
                      when we pray. Your partnership means a lot to The Logos
                      Zoe and the gospel reaching the nations of the world.
                    "
              />

              <OneTime
                imgSrc={podcast}
                imgAlt="partner option"
                title="Broadcast Production & Distribution"
                content="
                      The Word of Faith Podcast is a 10-minute podcast where the
                      unadulterated word of God is shared and distributed daily
                      to the phones and tablets of subscribers at no cost. We
                      believe that one word from God can contain an entire
                      life-changing formula. Our inspirational videos and wisdom
                      nuggets are Holy Ghost-filled messages to inspire and help
                      believers to navigate their lives in this changing world.
                      The end is near and the message of the gospel must be
                      preached in all nations of the world. Our salvation
                      messages are meant to help those who are at the ends of
                      the world to encounter Christ. This is why getting the
                      word of God to places where Christ is not known in audio
                      and video formats is important. In this way, those who
                      cannot read can still appreciate the word of God. Further,
                      we can get our podcast content onto online radios to
                      enable us reach many more with the gospel of Christ. Your
                      partnership will enable the production to keep up the good
                      work, as well as employ innovative ways of distributing
                      the audio messages they produce around the world. Your
                      donation means a lot to The Logos Zoe and the gospel
                      reaching the nations of the world.
                    "
              />
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

const Article = ({ imgSrc, imgAlt, title, content, navigate }) => (
  <article
    className="p-article"
    onClick={() => {
      navigate(`/donations/details`, {
        state: {
          category: title,
          imgSrc: imgSrc,
          content: content,
        },
      });
    }}
  >
    <div className="p-img">
      <img src={imgSrc} alt={imgAlt} />
    </div>
    <div className="expandable">
      <span className="p-title">{title}</span>
    </div>
  </article>
);

const PartnershipOption = ({ imgSrc, imgAlt, title, content: _content }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <li>
        <section>
          <div className="li-image">
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className="expandable">
            <span className="li-title">{title}</span>
            <NavLink to="/donations/donate" className="donate-btn">
              Donate
            </NavLink>
          </div>
        </section>
        <details
          className="options-group"
          open={isOpen}
          onToggle={(e) => setIsOpen(e.target.open)}
        >
          <summary
            style={{
              lineHeight: "2.1ch",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            {isOpen ? (
              <span style={{ color: "var(--red)" }}>Show less</span>
            ) : (
              <>
                {_content.substring(0, 90)}
                <span style={{ color: "var(--green)" }}>...read more</span>
              </>
            )}
          </summary>
          <p
            style={{
              lineHeight: "2.1ch",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
            }}
          >
            {_content}
          </p>
        </details>
      </li>
    </>
  );
}

const OneTime = ({ imgSrc, imgAlt, title, content: _content }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <li>
        <section>
          <div className="li-image">
            <img src={imgSrc} alt={imgAlt} />
          </div>
          <div className="expandable">
            <span className="li-title">{title}</span>
            <NavLink to="/donations/one-time" className="donate-btn">
              Donate
            </NavLink>
          </div>
        </section>
        <details
          className="options-group"
          open={isOpen}
          onToggle={(e) => setIsOpen(e.target.open)}
        >
          <summary
            style={{
              lineHeight: "2.1ch",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            {isOpen ? (
              <span style={{ color: "var(--red)" }}>Show less</span>
            ) : (
              <>
                {_content.substring(0, 90)}
                <span style={{ color: "var(--green)" }}>...read more</span>
              </>
            )}
          </summary>
          <p
            style={{
              lineHeight: "2.1ch",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
            }}
          >
            {_content}
          </p>
        </details>
      </li>
    </>
  );
}
export default Partnership;
