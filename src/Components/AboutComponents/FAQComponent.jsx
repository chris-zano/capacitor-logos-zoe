
const FAQ = () => {
    const faqData = [
        {
            question: "What is the meaning of The Logos-Zoé?",
            answer: "Logos-Zoe means 'Word of Life'. Jesus is the Word of Life (1 John 1:1). The Logos-Zoe app is our way of sending Jesus to the nations of the world."
        },
        {
            question: "What is The Noah's Project?",
            answer: "The Noah’s Project LBG is a Christian non profit initiative focused on providing spiritual growth resources, prayer tools, and guidance on discipleship, helping individuals find Jesus as their Lord and Saviour, and build their faith through various programs and teachings. We believe that wherever the internet is, the gospel should be sent there to help, especially those in regions where the gospel and Christianity is suppressed."
        },
        {
            question: "What is the connection between The Noah's Project and The Logos-Zoé?",
            answer: "The non-profit organization is The Noah's Project LBG, and the app that the organization has developed is The Logos-Zoe."
        },
        {
            question: "How can I get involved in the discipleship program?",
            answer: "You can join by exploring the 'Discipleship Program' section on the app, where we provide resources and steps to deepen your spiritual journey."
        },
        {
            question: "What types of prayers are offered on the app?",
            answer: "In the app, you will find audio prayer sessions in the Broadcast. In the 'Explore' session, you will find prayer where there are different prayer types, including the Tabernacle Prayer and the Setting Sail prayer method, designed to help strengthen personal prayer lives."
        },
        {
            question: "How can I access old versions of the daily devotional?",
            answer: "You can access the old versions by opening today's devotional on the app, then using the calendar provided right under the picture of the devotional, you choose a date and the app will furnish you with that day's devotional. Also, you can access the devotional, 'Scepter of Power Daily Devotional', directly on our website, where we post daily inspirational content to guide your walk with God."
        },
        {
            question: "Can I donate to the ministry?",
            answer: "Yes, we have a donation page where you can contribute to support the work of Noah’s Project. You can make a one-time donation or partner with us for ongoing support. You can either use the app or our website."
        },
        {
            question: "What is the purpose of the 'Jesus Talk' section?",
            answer: "'Jesus Talk' focuses on providing articles to answer the questions of sceptics and agnostics to make a decision to follow Christ. There, we also offer personal testimonies of those who have experienced the saving power of Jesus Christ in partnership with DELAFE."
        },
        {
            question: "Where can I find the 'Patmos Letters' and 'Spiritual Laws'?",
            answer: "In the Explore session, both can be found there. Also, on our website, both resources are available in the 'Discipleship' section, offering teachings that help believers understand spiritual principles and laws."
        },
        {
            question: "How can I share my testimony?",
            answer: "We invite you to share your personal testimony on our website by submitting it through the designated form under the 'Share Your Testimony' section."
        },
        {
            question: "Are there any resources for understanding dreams in the Christian context?",
            answer: "Yes, we offer resources under the 'Dreams' section to help interpret dreams based on Christian teachings and the Holy Spirit’s guidance."
        },
        {
            question: "How can I contact Noah’s Project?",
            answer: "You can contact us through the 'Contact' section on the app or our website for any inquiries, prayer requests, or partnership information."
        },
        {
            question: "What is the URL of your website?",
            answer: "If you want to check out our website, use: www.noahsproject.org"
        }
    ];

    return (
        <div style={{ padding: "0 2ch" }}>
            <div>
                {faqData.map((item, index) => (
                    <div key={index} style={{ marginBottom: "1ch" }} className="poppins-regular">
                        <h3>{index + 1}. {item.question}</h3>
                        <p>{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
