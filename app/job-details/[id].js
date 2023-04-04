//dynamic routing for job details page to display each individual job
import React, { useCallback, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
import useFetch from '../../hook/useFetch.js';

const tabs = ['About', 'Qualifications', 'Responsibilities'];

const JobDetails = () => {
  const params = useSearchParams(); //lets us get specific ID of the job details page we are on
  const router = useRouter();

  //fetch job details data
  const { data, isLoading, error, refetch } = useFetch(
    'job-details', { job_id: params.id }
  )
  //refresh control
  const [refreshing, setRefreshing] = useState(false);
  //which tab is currently active
  const [activeTab, setActiveTab] = useState(tabs[0]); //tabs0 is 'About' section

  // onRefresh function will make sure we dont have to wait for the data to be fetched before we can refresh the page
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      // if we are on the qualifications tab, we return the Specifics component
      case 'Qualifications':
        return <Specifics 
          title='Qualifications'
          points={data[0].job_highlights?.Qualifications ?? ['No Data']}  //if the qualifications dont exist, we return 'No Data'. The API is the one that calls Qualifications with a capitol letter
        />
      case 'About':
        return <JobAbout 
          info={data[0].job_description ?? 'No Data Provided'}
        />
      case 'Responsibilities':
        return <Specifics 
          title='Responsibilities'
          points={data[0].job_highlights?.Responsibilities ?? ['No Data']}
        />
      default:
      break;
    }
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false, //removes small thin line under header
          headerBackVisible: false, //removes back button
          headerLeft: () => (
            <ScreenHeaderBtn 
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn 
              iconUrl={icons.share}
              dimension='60%'      
            />
          ),
          headerTitle: '', //empty string to remove the word 'title'
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}                 
            />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data?.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />

              <JobTabs 
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Tab Content */}
              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        {/* Open new tab to apply for position */}
        {/* we pass in a URL (job_google_link) which is the actual link of the job. Or if not, we go to another job link as a fallback */}
        <JobFooter 
          url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"}
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;