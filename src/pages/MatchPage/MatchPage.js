import React from 'react';
import Header from "../../components/Header/Header";
import styles from "./MatchPage.module.css"
import robbert from "../../assets/Robbert.jpg"
import floortje from "../../assets/Floortje.jpg"
import Avatar from "../../components/Avatar/Avatar";
import HomeworkField from "../../components/HomeworkField/HomeworkField";

const MatchPage = () => {
    return (
        <div className={styles.container}>
            <Header text="Match pagina" />
            <div className={styles.field}>
                <div className={styles.avatars}>
                    <Avatar photo={robbert}
                            alt="Foto van docent"
                    />
                    <Avatar photo={floortje}
                            alt="Foto van leering"
                    />
                </div>
                <HomeworkField
                    name="Floortje"
                    homework="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam inventore molestias? Adipisci asperiores consequuntur corporis debitis dignissimos ea eligendi expedita harum in itaque magnam nesciunt nulla praesentium quae quasi repudiandae rerum sed sit totam, ut vel velit, vitae! Adipisci amet at beatae commodi cumque dolor, dolorum eos error est explicabo fuga id, in ipsa iste laborum laudantium magni maiores modi natus necessitatibus obcaecati odio officia officiis quos repellendus sed suscipit temporibus tenetur ullam vitae. A amet architecto asperiores at deleniti dicta dolor dolores doloribus earum error esse eum eveniet inventore iure nobis numquam obcaecati odio perferendis, perspiciatis, possimus praesentium quas quasi quia quos rerum suscipit temporibus tenetur? Aliquid amet consequuntur, cum deleniti dolore doloremque eum fugit ipsa laborum minima necessitatibus obcaecati odio quidem sint sit, suscipit temporibus velit voluptatum? Atque cum error incidunt molestias numquam quam quibusdam saepe unde vitae voluptatum. A accusantium asperiores assumenda commodi consequuntur corporis dignissimos distinctio dolore eligendi eos et explicabo facere laborum laudantium libero magnam, maxime minima minus nihil nisi nostrum odio odit perferendis placeat praesentium provident quae quia quisquam quo, reiciendis repellat temporibus vero voluptate. Ad consequuntur dolor, dolore earum enim error ex facilis ipsum iste laudantium mollitia necessitatibus, nisi odit officia placeat tenetur vel voluptatem voluptatum! Autem delectus dolore, ducimus et ex id impedit minus nostrum numquam quasi totam veritatis. Ad adipisci, aliquid asperiores beatae culpa cumque facilis fuga inventore labore molestiae necessitatibus odit pariatur perspiciatis, possimus quibusdam quod veritatis vitae, voluptatum! Ad aliquid at aut cupiditate, distinctio dolor dolore dolorem dolores esse ex hic id illum, impedit ipsa ipsum laudantium magnam magni modi molestiae nisi numquam optio quidem quo reiciendis repudiandae sequi suscipit? Accusamus cupiditate est eveniet. Ab adipisci cumque deleniti dolorum impedit in iste nisi nostrum ratione repudiandae temporibus vel veritatis, voluptatum! Accusamus at delectus incidunt laboriosam ullam? Animi deleniti, deserunt dolorem, eius itaque laudantium, mollitia officia quibusdam recusandae repudiandae sapiente sequi temporibus velit! Animi aperiam asperiores at corporis dolorem explicabo hic reiciendis repellat sint? Aliquid enim fugit perspiciatis quisquam sequi? Architecto aspernatur aut autem commodi consequatur debitis deleniti dicta dolor earum, eligendi enim eos fuga hic inventore libero magni maiores, minus nam nostrum odit omnis quaerat quia quibusdam quis quos rem saepe sed unde velit voluptatum. Amet asperiores debitis delectus, dolorem eaque enim error hic incidunt inventore iusto nobis omnis quibusdam, repellendus repudiandae rerum totam velit voluptas. Ab dicta et eveniet sapiente! Amet et ipsum nemo nobis, provident tenetur!"
                    />
            </div>
        </div>
    );
};

export default MatchPage;
