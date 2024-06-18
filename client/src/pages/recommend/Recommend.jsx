import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Card from "../../components/Card/Card";
import "./style.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Recommend = () => {
  const [sponsorData, setSponsorData] = useState(null);
  const [currentUserSponsorData, setCurrentUserSponsorData] = useState(null);
  const [athleteData, setAthleteData] = useState(null);
  const [currentUserAthleteData, setCurrentUserAthleteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
        const athleteAge = currentUserAthleteData.age;
        const athleteSport = currentUserAthleteData.sport;

        if (
          !sponsor ||
          !sponsor["Target Audience"] ||
          !sponsor["Preferred Sport"] ||
          !sponsor["Marketing Goals"]
        ) {
          return false; // Skip this sponsor if any required property is null
        }

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

        const preferredSportMatches =
          sponsor["Preferred Sport"].toLowerCase() ===
          athleteSport.toLowerCase();

        const marketingGoalsMatchAchievements = sponsor["Marketing Goals"]
          .toLowerCase()
          .includes("brand awareness");

        return (
          
          preferredSportMatches &&
          (targetAudienceIncludesAge ||
          marketingGoalsMatchAchievements)
        );
      });

      // Shuffle the recommended sponsors array
      const shuffledSponsors = shuffleArray(recommendedSponsors);

      // Take only the top 5 sponsors from the shuffled array
      const top5Sponsors = shuffledSponsors.slice(0, 5);

      setCurrentUserSponsorData(top5Sponsors);
      setLoading(false);
    }
  }, [currentUserAthleteData, sponsorData]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div className="container" style={{ background: "rgb(0, 31, 63)" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="heading" style={{ color: "white" }}>
            Recommended Sponsors for{" "}
            {currentUserAthleteData && currentUserAthleteData.name}
          </h2>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
          >
            {currentUserSponsorData &&
              currentUserSponsorData.map((sponsor) => (
                <SwiperSlide key={sponsor.id}>
                  <Link
                    to={`/sponsorProfile/${sponsor._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sponsor={sponsor} />
                  </Link>
                </SwiperSlide>
              ))}
            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <FaArrowLeft />
              </div>
              <div className="swiper-button-next slider-arrow">
                <FaArrowRight />
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Recommend;
