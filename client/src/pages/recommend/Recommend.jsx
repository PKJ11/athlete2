import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Card from "../../components/Card/Card"; // Import the Card component
import "./style.css";

const Recommend = () => {
  const [sponsorData, setSponsorData] = useState(null);
  const [currentUserSponsorData, setCurrentUserSponsorData] = useState(null);
  const [athleteData, setAthleteData] = useState(null);
  const [currentUserAthleteData, setCurrentUserAthleteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const swiper = useSwiper();

  useEffect(() => {
    const fetchSponsorsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/sponsor`);
        setSponsorData(response.data);
      } catch (error) {
        console.error("Error fetching sponsor data:", error);
      }
    };

    const fetchAthleteData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/athlete");
        setAthleteData(response.data);
      } catch (error) {
        console.error("Error fetching athlete data:", error);
      }
    };

    fetchSponsorsData();
    fetchAthleteData();
  }, []);

  useEffect(() => {
    if (athleteData && athleteData.length > 0) {
      const currentUserAthlete = athleteData.find(
        (athlete) => athlete.userId === id
      );
      setCurrentUserAthleteData(currentUserAthlete);
    }
  }, [athleteData, id]);

  useEffect(() => {
    if (currentUserAthleteData && sponsorData) {
      const recommendedSponsors = sponsorData.filter((sponsor) => {
        // Filter sponsors based on athlete's age, preferred sport, and achievements
        const athleteAge = currentUserAthleteData.age;
        const athleteSport = currentUserAthleteData.sport;

        // Determine target audience based on athlete's age
        let targetAudienceIncludesAge;
        if (athleteAge < 18) {
          targetAudienceIncludesAge = sponsor["Target Audience"]
            .toLowerCase()
            .includes("teens");
        } else if (athleteAge >= 18 && athleteAge <= 25) {
          targetAudienceIncludesAge = sponsor["Target Audience"]
            .toLowerCase()
            .includes("young adults");
        } else {
          targetAudienceIncludesAge = sponsor["Target Audience"]
            .toLowerCase()
            .includes("adults");
        }

        // Example criteria: Sponsor's preferred sport matches athlete's sport
        const preferredSportMatches =
          sponsor["Preferred Sport"].toLowerCase() ===
          athleteSport.toLowerCase();

        // Example criteria: Sponsor's marketing goals align with athlete's achievements
        const marketingGoalsMatchAchievements = sponsor["Marketing Goals"]
          .toLowerCase()
          .includes("brand awareness");

        // Return true if all criteria are met
        return (
          targetAudienceIncludesAge &&
          preferredSportMatches &&
          marketingGoalsMatchAchievements
        );
      });
      setCurrentUserSponsorData(recommendedSponsors);
      setLoading(false);
    }
  }, [currentUserAthleteData, sponsorData]);

  return (
    <div className="recommadationContainer ">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="headerRecomadation">
            Recommended Sponsors for{" "}
            {currentUserAthleteData && currentUserAthleteData.name}
          </h2>
          <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={false}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              250: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              750: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1050: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1399: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {currentUserSponsorData &&
              currentUserSponsorData.map((sponsor) => (
                <SwiperSlide key={sponsor.id}>
                  <Card sponsor={sponsor} />
                </SwiperSlide>
              ))}
          </Swiper>
         
        </div>
      )}
    </div>
  );
};

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="s-buttons flexCenter">
      <button
        className="button swiper-button-prev"
        onClick={() => swiper.slidePrev()}
      >
        &lt;
      </button>
      <button
        className="button swiper-button-next"
        onClick={() => swiper.slideNext()}
      >
        &gt;
      </button>
    </div>
  );
};

export default Recommend;
