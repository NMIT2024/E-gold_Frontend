import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Profile from '../dashboard/Profile';
import AddressComponent from '../proof/AddressComponent';
import PhotoIDComponent from '../proof/PhotoIDComponent';
import './Tab.css';

function TabComponent() {
    return (
        <div className="App ">
            <Tabs>
                <TabList>
                    <Tab>
                        <p className="menu_title">Identity Information</p>
                    </Tab>
                    <Tab>
                        <p className="menu_title">Photo ID</p>
                    </Tab>
                    <Tab>
                        <p className="menu_title">Address Proof</p>
                    </Tab>
                    <Tab>
                        <p className="menu_title">Documentation Upload</p>
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className="panel-content">
                        <h3 className="form-title">A. Identity Information</h3>
                        <Profile />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h3 className="form-title">B. Photo ID Verification</h3>
                        <PhotoIDComponent />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h3 className="form-title">C. Address Proof Verification</h3>
                        <AddressComponent />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <h3 className="form-title">D. Documentation Upload</h3>
                        <AddressComponent />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default TabComponent