use crate::*;
use utils::*;

#[near_bindgen]
impl Contract {
    pub fn check_time(&self, update_time: u32) -> bool {
        nano_to_sec(env::block_timestamp()) - update_time > self.update_sec
    }

    pub fn update_check(&mut self, token_id: &TokenId) {
        let metadata = self
            .tokens
            .token_metadata_by_id
            .as_ref()
            .and_then(|by_id| by_id.get(token_id))
            .unwrap();
        let last_update = metadata.updated_at.unwrap().parse::<u32>().unwrap();
        require!(
            self.check_time(last_update) == true,
            "current timestamp < interval"
        );
        let (title, media) = match parse_name(metadata.title.as_ref().unwrap()) {

            Name::Egg => {
                let title = format!("Chick#{}", token_id);
                let media = CHICK_MEDIA.to_string();
                env::log_str((&title, &media).0.as_str());
                (title, media)
            }
            Name::Chick => {
                (metadata.title.unwrap(), metadata.media.unwrap())
            }
            Name::Rooster => {
                (metadata.title.unwrap(), metadata.media.unwrap())
            }
        };
        env::log_str((&title, &media).0.as_str());
        self.get_entry(
            PAIR.to_string(),
            PROVIDER.parse().unwrap(),
            token_id,
            &title,
            &media,
        );
    }
}
