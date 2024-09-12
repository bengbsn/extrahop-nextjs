import { CONTENT_TYPE_JSON, CONTENT_TYPE_FORM_DATA } from '@/data/constants';

class ExtrahopApi {
  constructor(baseUrl, apiKey, apiPrefix) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.apiPrefix = apiPrefix || '/api/v1';
    this.headers = { 'Authorization': `ExtraHop apikey=${apiKey}` };
  }

  async request(endpoint, method = 'GET', data = null) {
    const isFormData = (data instanceof FormData);
    const contentType = isFormData ? CONTENT_TYPE_JSON : CONTENT_TYPE_FORM_DATA;

    const url = `${this.baseUrl}${this.apiPrefix}${endpoint}`;
    const headers = { ...this.headers, 'Content-Type': contentType };
    const body = isFormData ? data : (data ? JSON.stringify(data) : null);

    const response = await fetch(url, { method, headers, body});
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    if ((response.headers.get('content-type') || '').includes('application/json')) {
      try {
        return await response.json();
      } catch (error) {
        throw new Error('Invalid JSON response from server');
      }
    } else {
      return response.text();
    }
  }

  // Activity Map methods
  async getAllActivityMaps() {
    // Retrieve all saved activity maps.
    return this.request('/activitymaps');
  }

  async createActivityMap(data) {
    // Create a new activity map.
    return this.request('/activitymaps', 'POST', data);
  }

  async getActivityMap(id) {
    // Retrieve a specific activity map.
    return this.request(`/activitymaps/${id}`);
  }

  async updateActivityMap(id, data) {
    // Update a specific activity map.
    return this.request(`/activitymaps/${id}`, 'PATCH', data);
  }

  async deleteActivityMap(id) {
    // Delete a specific activity map.
    return this.request(`/activitymaps/${id}`, 'DELETE');
  }

  async createActivityMapQuery(data) {
    // Perform a network topology query.
    return this.request('/activitymaps/query', 'POST', data);
  }

  async createActivityMapQueryForActivityMap(id, data) {
    // Perform a topology query for a specific activity map.
    return this.request(`/activitymaps/${id}/query`, 'POST', data);
  }

  async getActivityMapSharing(id) {
    // Retrieve the users and their sharing permissions for a specific activity map.
    return this.request(`/activitymaps/${id}/sharing`);
  }

  async updateActivityMapSharing(id, data) {
    // Update the users and their sharing permissions for a specific activity map.
    return this.request(`/activitymaps/${id}/sharing`, 'PATCH', data);
  }

  async replaceActivityMapSharing(id, data) {
    // Replace the users and their sharing permissions for a specific activity map.
    return this.request(`/activitymaps/${id}/sharing`, 'PUT', data);
  }

  // Alert methods
  async getAllAlerts() {
    // Retrieve all alerts.
    return this.request('/alerts');
  }

  async createAlert(data) {
    // Create a new alert with specified values.
    return this.request('/alerts', 'POST', data);
  }

  async getAlert(id) {
    // Retrieve a specific alert.
    return this.request(`/alerts/${id}`);
  }

  async updateAlert(id, data) {
    // Update a specific alert.
    return this.request(`/alerts/${id}`, 'PATCH', data);
  }

  async deleteAlert(id) {
    // Delete a specific alert.
    return this.request(`/alerts/${id}`, 'DELETE');
  }

  async getAlertApplications(id) {
    // Retrieve all applications that have a specific alert assigned.
    return this.request(`/alerts/${id}/applications`);
  }

  async manageAlertApplications(id, data) {
    // Assign and unassign a specific alert to applications.
    return this.request(`/alerts/${id}/applications`, 'POST', data);
  }

  async assignAlertToApplication(alertId, applicationId) {
    // Assign an application to a specific alert.
    return this.request(`/alerts/${alertId}/applications/${applicationId}`, 'POST');
  }

  async unassignAlertFromApplication(alertId, applicationId) {
    // Unassign an application from a specific alert.
    return this.request(`/alerts/${alertId}/applications/${applicationId}`, 'DELETE');
  }

  async getAlertDeviceGroups(id) {
    // Retrieve all device groups that are assigned to a specific alert.
    return this.request(`/alerts/${id}/devicegroups`);
  }

  async manageAlertDeviceGroups(id, data) {
    // Assign and unassign a specific alert to device groups.
    return this.request(`/alerts/${id}/devicegroups`, 'POST', data);
  }

  async assignAlertToDeviceGroup(alertId, deviceGroupId) {
    // Assign a device group to a specific alert.
    return this.request(`/alerts/${alertId}/devicegroups/${deviceGroupId}`, 'POST');
  }

  async unassignAlertFromDeviceGroup(alertId, deviceGroupId) {
    // Unassign a device group from a specific alert.
    return this.request(`/alerts/${alertId}/devicegroups/${deviceGroupId}`, 'DELETE');
  }

  async getAlertDevices(id) {
    // Retrieve all devices that have a specific alert assigned.
    return this.request(`/alerts/${id}/devices`);
  }

  async manageAlertDevices(id, data) {
    // Assign and unassign a specific alert to devices.
    return this.request(`/alerts/${id}/devices`, 'POST', data);
  }

  async assignAlertToDevice(alertId, deviceId) {
    // Assign a device to a specific alert.
    return this.request(`/alerts/${alertId}/devices/${deviceId}`, 'POST');
  }

  async unassignAlertFromDevice(alertId, deviceId) {
    // Unassign a device from a specific alert.
    return this.request(`/alerts/${alertId}/devices/${deviceId}`, 'DELETE');
  }

  async getAlertEmailGroups(id) {
    // Retrieve all email groups that are assigned to a specific alert.
    return this.request(`/alerts/${id}/emailgroups`);
  }

  async manageAlertEmailGroups(id, data) {
    // Assign and unassign a specific alert to email groups.
    return this.request(`/alerts/${id}/emailgroups`, 'POST', data);
  }

  async assignAlertToEmailGroup(alertId, emailGroupId) {
    // Assign an email group to a specific alert.
    return this.request(`/alerts/${alertId}/emailgroups/${emailGroupId}`, 'POST');
  }

  async unassignAlertFromEmailGroup(alertId, emailGroupId) {
    // Unassign an email group from a specific alert.
    return this.request(`/alerts/${alertId}/emailgroups/${emailGroupId}`, 'DELETE');
  }

  async getAlertExclusionIntervals(id) {
    // Retrieve all exclusion intervals assigned to a specific alert.
    return this.request(`/alerts/${id}/exclusionintervals`);
  }

  async getAlertNetworks(id) {
    // Retrieve all networks that are assigned to a specific alert.
    return this.request(`/alerts/${id}/networks`);
  }

  async getAlertStats(id) {
    // Retrieve statistics for a specific alert.
    return this.request(`/alerts/${id}/stats`);
  }

  // Analysis Priority methods
  async getAnalysisPriorityConfig(applianceId) {
    // Retrieve the analysis priority rules for a specific sensor.
    return this.request(`/analysispriority/config/${applianceId}`);
  }

  async replaceAnalysisPriorityConfig(applianceId, data) {
    // Replace the analysis priority rules for a specific sensor.
    return this.request(`/analysispriority/config/${applianceId}`, 'PUT', data);
  }

  async getAnalysisPriorityManager(applianceId) {
    // Retrieve the console that manages analysis priority rules for a specific sensor.
    return this.request(`/analysispriority/${applianceId}/manager`);
  }

  async updateAnalysisPriorityManager(applianceId, data) {
    // Update which sensor or console manages analysis priority rules for the local sensor.
    return this.request(`/analysispriority/${applianceId}/manager`, 'PATCH', data);
  }

  // API Key methods
  async getAllApiKeys() {
    // Retrieve all API keys.
    return this.request('/apikeys');
  }

  async createApiKey(data) {
    // Create the initial API key for the setup user account.
    return this.request('/apikeys', 'POST', data);
  }

  async getApiKey(keyid) {
    // Retrieve information about a specific API key.
    return this.request(`/apikeys/${keyid}`);
  }

  // Appliance methods
  async getAllAppliances() {
    // Retrieve information about this appliance and all connected appliances.
    return this.request('/appliances');
  }

  async createAppliance(data) {
    // Establish a new connection to a remote ExtraHop appliance.
    return this.request('/appliances', 'POST', data);
  }

  async getAppliance(id) {
    // Retrieve information about this appliance or connected appliances.
    return this.request(`/appliances/${id}`);
  }

  async deleteAppliance(id) {
    // Disconnect a specific ExtraHop appliance from this console.
    return this.request(`/appliances/${id}`, 'DELETE');
  }

  async getApplianceCloudServices(id) {
    // Retrieve the status of ExtraHop Cloud Services on this appliance.
    return this.request(`/appliances/${id}/cloudservices`);
  }

  async modifyApplianceCloudServices(id, data) {
    // Modify ExtraHop Cloud Services settings on this appliance.
    return this.request(`/appliances/${id}/cloudservices`, 'POST', data);
  }

  async getApplianceProductKey(id) {
    // Retrieve the product key for a specified appliance (only valid on consoles).
    return this.request(`/appliances/${id}/productkey`);
  }

  // Application methods
  async getAllApplications(params) {
    // Retrieve all applications that were active within a specific timeframe.
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/applications?${queryString}`);
  }

  async createApplication(data) {
    // Create a new application.
    return this.request('/applications', 'POST', data);
  }

  async getApplication(id, includeCriteria = false) {
    // Retrieve a specific application.
    return this.request(`/applications/${id}?include_criteria=${includeCriteria}`);
  }

  async updateApplication(id, data) {
    // Update a specific application.
    return this.request(`/applications/${id}`, 'PATCH', data);
  }

  async getApplicationActivity(id) {
    // Retrieve all activity for a specific application.
    return this.request(`/applications/${id}/activity`);
  }

  async getApplicationAlerts(id, directAssignmentsOnly = false) {
    // Retrieve all alerts that are assigned to a specific application.
    return this.request(`/applications/${id}/alerts?direct_assignments_only=${directAssignmentsOnly}`);
  }

  async manageApplicationAlerts(id, data) {
    // Assign and unassign alerts to a specific application.
    return this.request(`/applications/${id}/alerts`, 'POST', data);
  }

  async assignAlertToApplication(applicationId, alertId) {
    // Assign an alert to a specific application.
    return this.request(`/applications/${applicationId}/alerts/${alertId}`, 'POST');
  }

  async unassignAlertFromApplication(applicationId, alertId) {
    // Unassign an alert from a specific application.
    return this.request(`/applications/${applicationId}/alerts/${alertId}`, 'DELETE');
  }

  async getApplicationDashboards(id) {
    // Retrieve all dashboards related to a specific application.
    return this.request(`/applications/${id}/dashboards`);
  }

  // Audit Log methods
  async getAuditLog(limit = 100, offset = 0) {
    // Retrieve all audit log messages.
    const params = new URLSearchParams({ limit, offset });
    return this.request(`/auditlog?${params.toString()}`);
  }

  // Auth methods
  async getAllIdentityProviders() {
    // Retrieve all identity providers.
    return this.request('/auth/identityproviders');
  }

  async createIdentityProvider(data) {
    // Add an identity provider for remote authentication.
    return this.request('/auth/identityproviders', 'POST', data);
  }

  async getIdentityProvider(id) {
    // Retrieve a specific identity provider.
    return this.request(`/auth/identityproviders/${id}`);
  }

  async updateIdentityProvider(id, data) {
    // Update an existing identity provider.
    return this.request(`/auth/identityproviders/${id}`, 'PATCH', data);
  }

  async deleteIdentityProvider(id) {
    // Delete a specific identity provider.
    return this.request(`/auth/identityproviders/${id}`, 'DELETE');
  }

  async getIdentityProviderPrivileges(id) {
    // Retrieve the privilege settings for a specific identity provider.
    return this.request(`/auth/identityproviders/${id}/privileges`);
  }

  async updateIdentityProviderPrivileges(id, data) {
    // Update the privilege settings for a specific identity provider.
    return this.request(`/auth/identityproviders/${id}/privileges`, 'PATCH', data);
  }

  async getSamlMetadata(xml = false) {
    // Retrieve SAML security provider (SP) metadata for this ExtraHop system.
    return this.request(`/auth/samlsp?xml=${xml}`);
  }

  // Bundle methods
  async getAllBundles() {
    // Retrieve metadata about all bundles.
    return this.request('/bundles');
  }

  async createBundle(data) {
    // Upload a new bundle.
    return this.request('/bundles', 'POST', data);
  }

  async getBundle(id) {
    // Retrieve a specific bundle export.
    return this.request(`/bundles/${id}`);
  }

  async deleteBundle(id) {
    // Delete a specific bundle.
    return this.request(`/bundles/${id}`, 'DELETE');
  }

  async applyBundle(id, data) {
    // Apply a saved bundle.
    return this.request(`/bundles/${id}/apply`, 'POST', data);
  }

  // Cloud methods
  async createCloudConnect(data) {
    // Connect a sensor to RevealX 360.
    return this.request('/cloud/connect', 'POST', data);
  }

  // Custom Device methods
  async getAllCustomDevices(includeCriteria = false) {
    // Retrieve all custom devices.
    return this.request(`/customdevices?include_criteria=${includeCriteria}`);
  }

  async createCustomDevice(data) {
    // Create a custom device.
    return this.request('/customdevices', 'POST', data);
  }

  async getCustomDevice(id, includeCriteria = false) {
    // Retrieve a specific custom device.
    return this.request(`/customdevices/${id}?include_criteria=${includeCriteria}`);
  }

  async updateCustomDevice(id, data) {
    // Update a specific custom device.
    return this.request(`/customdevices/${id}`, 'PATCH', data);
  }

  async deleteCustomDevice(id) {
    // Delete a specific custom device.
    return this.request(`/customdevices/${id}`, 'DELETE');
  }

  // Customizations methods
  async getAllCustomizations() {
    // Retrieve all customizations (backup files).
    return this.request('/customizations');
  }

  async createCustomization(data) {
    // Create a new customization (backup file).
    return this.request('/customizations', 'POST', data);
  }

  async getCustomizationStatus() {
    // Retrieve the status of the customization (backup) process.
    return this.request('/customizations/status');
  }

  async getCustomization(id) {
    // Retrieve a specific customization (backup file).
    return this.request(`/customizations/${id}`);
  }

  async deleteCustomization(id) {
    // Delete a specific customization (backup file).
    return this.request(`/customizations/${id}`, 'DELETE');
  }

  async applyCustomization(id, data) {
    // Apply a specific customization (backup file).
    return this.request(`/customizations/${id}/apply`, 'POST', data);
  }

  async downloadCustomization(id) {
    // Download a specific customization (backup file).
    return this.request(`/customizations/${id}/download`, 'POST');
  }

  // Dashboard methods
  async getAllDashboards() {
    // Retrieve all dashboards.
    return this.request('/dashboards');
  }

  async getDashboard(id) {
    // Retrieve a specific dashboard.
    return this.request(`/dashboards/${id}`);
  }

  async updateDashboard(id, data) {
    // Update ownership of a specific dashboard.
    return this.request(`/dashboards/${id}`, 'PATCH', data);
  }

  async deleteDashboard(id) {
    // Delete a specific dashboard.
    return this.request(`/dashboards/${id}`, 'DELETE');
  }

  async getDashboardSharing(id) {
    // Retrieve the users and their sharing permissions for a specific dashboard.
    return this.request(`/dashboards/${id}/sharing`);
  }

  async updateDashboardSharing(id, data) {
    // Update the users and their sharing permissions for a specific dashboard.
    return this.request(`/dashboards/${id}/sharing`, 'PATCH', data);
  }

  async replaceDashboardSharing(id, data) {
    // Replace the users and their sharing permissions for a specific dashboard.
    return this.request(`/dashboards/${id}/sharing`, 'PUT', data);
  }

  // Detection methods
  async getAllDetections(limit = 1000) {
    // Retrieve all detections.
    return this.request(`/detections?limit=${limit}`);
  }

  async searchDetections(data) {
    // Search for detections.
    return this.request('/detections/search', 'POST', data);
  }

  async updateDetectionTickets(data) {
    // Update tickets associated with detections.
    return this.request('/detections/tickets', 'PATCH', data);
  }

  async getAllDetectionHidingRules() {
    // Retrieve all tuning rules.
    return this.request('/detections/rules/hiding');
  }

  async createDetectionHidingRule(data) {
    // Create a tuning rule.
    return this.request('/detections/rules/hiding', 'POST', data);
  }

  async getDetectionHidingRule(id) {
    // Retrieve a specific tuning rule.
    return this.request(`/detections/rules/hiding/${id}`);
  }

  async updateDetectionHidingRule(id, data) {
    // Update a tuning rule.
    return this.request(`/detections/rules/hiding/${id}`, 'PATCH', data);
  }

  async deleteDetectionHidingRule(id) {
    // Delete a tuning rule.
    return this.request(`/detections/rules/hiding/${id}`, 'DELETE');
  }

  async getDetectionHidingRulesByAuthor(author) {
    // Retrieve all hiding rules created by a specific user.
    return this.request(`/detections/rules/hiding/author/${author}`);
  }

  async getDetectionHidingRulesByOffense(offenseId) {
    // Retrieve all hiding rules that apply to a specific offense ID.
    return this.request(`/detections/rules/hiding/offenses/${offenseId}`);
  }

  async getDetectionFormats() {
    // Retrieve all detection formats.
    return this.request('/detections/formats');
  }

  async createDetectionFormat(data) {
    // Create a new custom detection format.
    return this.request('/detections/formats', 'POST', data);
  }

  async getDetectionFormat(id, builtInOnly = false) {
    // Retrieve a specific detection format.
    return this.request(`/detections/formats/${id}?built_in_only=${builtInOnly}`);
  }

  async updateDetectionFormat(id, data) {
    // Update a specific custom detection format.
    return this.request(`/detections/formats/${id}`, 'PATCH', data);
  }

  async deleteDetectionFormat(id) {
    // Delete a specific custom detection format.
    return this.request(`/detections/formats/${id}`, 'DELETE');
  }

  async getDetectionTicketTemplates() {
    // Retrieve all ticket templates for detections.
    return this.request('/detections/ticket/templates');
  }

  async getDetection(id) {
    // Retrieve a specific detection.
    return this.request(`/detections/${id}`);
  }

  async updateDetection(id, data) {
    // Update a detection.
    return this.request(`/detections/${id}`, 'PATCH', data);
  }

  async getDetectionInvestigations(id) {
    // Retrieve all investigations that a specific detection is in.
    return this.request(`/detections/${id}/investigations`);
  }

  async getDetectionNotes(id) {
    // Retrieve the notes for a given detection.
    return this.request(`/detections/${id}/notes`);
  }

  async updateDetectionNotes(id, data) {
    // Create or replace notes for a given detection.
    return this.request(`/detections/${id}/notes`, 'PUT', data);
  }

  async deleteDetectionNotes(id) {
    // Delete the notes for a given detection.
    return this.request(`/detections/${id}/notes`, 'DELETE');
  }

  async getRelatedDetections(id, from, until) {
    // Retrieve all detections related to a specific detection.
    return this.request(`/detections/${id}/related?from=${from}&until=${until}`);
  }

  async getDetectionTicket(id) {
    // Retrieve the ticket for a specific detection.
    return this.request(`/detections/${id}/ticket`);
  }

  async updateDetectionTicket(id, data) {
    // Update the ticket for a specific detection.
    return this.request(`/detections/${id}/ticket`, 'PATCH', data);
  }

  async getDetectionHistory(id) {
    // Retrieve the history for a specific detection.
    return this.request(`/detections/${id}/history`);
  }

  // Device methods
  async getAllDevices(params = {}) {
    // Retrieve all devices discovered by the ExtraHop system.
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/devices?${queryString}`);
  }

  async getDevice(id) {
    // Retrieve a specific device.
    return this.request(`/devices/${id}`);
  }

  async updateDevice(id, data) {
    // Update a specific device.
    return this.request(`/devices/${id}`, 'PATCH', data);
  }

  async searchDevices(data) {
    // Search for devices that match specific criteria.
    return this.request('/devices/search', 'POST', data);
  }

  async getDeviceActivity(id) {
    // Retrieve activity for a specific device.
    return this.request(`/devices/${id}/activity`);
  }

  async getDeviceAlerts(id, directAssignmentsOnly = false) {
    // Retrieve all alerts assigned to a specific device.
    return this.request(`/devices/${id}/alerts?direct_assignments_only=${directAssignmentsOnly}`);
  }

  async manageDeviceAlerts(id, data) {
    // Assign and unassign alerts to a specific device.
    return this.request(`/devices/${id}/alerts`, 'POST', data);
  }

  async assignAlertToDevice(deviceId, alertId) {
    // Assign an alert to a specific device.
    return this.request(`/devices/${deviceId}/alerts/${alertId}`, 'POST');
  }

  async unassignAlertFromDevice(deviceId, alertId) {
    // Unassign an alert from a specific device.
    return this.request(`/devices/${deviceId}/alerts/${alertId}`, 'DELETE');
  }

  async getDeviceDashboards(id) {
    // Retrieve all dashboards related to a specific device.
    return this.request(`/devices/${id}/dashboards`);
  }

  async getDeviceDnsNames(id) {
    // Retrieve DNS names for a specific device.
    return this.request(`/devices/${id}/dnsnames`);
  }

  async getDeviceGroups(id) {
    // Retrieve device groups that include a specific device.
    return this.request(`/devices/${id}/devicegroups`);
  }

  async getDeviceIpAddresses(id) {
    // Retrieve IP addresses for a specific device.
    return this.request(`/devices/${id}/ipaddresses`);
  }

  async getDeviceSoftware(id) {
    // Retrieve software information for a specific device.
    return this.request(`/devices/${id}/software`);
  }

  async getDeviceTags(id) {
    // Retrieve tags for a specific device.
    return this.request(`/devices/${id}/tags`);
  }

  async manageDeviceTags(id, data) {
    // Assign and unassign tags to a specific device.
    return this.request(`/devices/${id}/tags`, 'POST', data);
  }

  async assignTagToDevice(deviceId, tagId) {
    // Assign a tag to a specific device.
    return this.request(`/devices/${deviceId}/tags/${tagId}`, 'POST');
  }

  async unassignTagFromDevice(deviceId, tagId) {
    // Unassign a tag from a specific device.
    return this.request(`/devices/${deviceId}/tags/${tagId}`, 'DELETE');
  }

  async getDeviceTriggers(id) {
    // Retrieve triggers for a specific device.
    return this.request(`/devices/${id}/triggers`);
  }

  async manageDeviceTriggers(id, data) {
    // Assign and unassign triggers to a specific device.
    return this.request(`/devices/${id}/triggers`, 'POST', data);
  }

  async assignTriggerToDevice(deviceId, triggerId) {
    // Assign a trigger to a specific device.
    return this.request(`/devices/${deviceId}/triggers/${triggerId}`, 'POST');
  }

  async unassignTriggerFromDevice(deviceId, triggerId) {
    // Unassign a trigger from a specific device.
    return this.request(`/devices/${deviceId}/triggers/${triggerId}`, 'DELETE');
  }

  // Device group methods
  async getAllDeviceGroups(params = {}) {
    // Retrieve all device groups.
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/devicegroups?${queryString}`);
  }

  async createDeviceGroup(data) {
    // Create a new device group.
    return this.request('/devicegroups', 'POST', data);
  }

  async getDeviceGroup(id) {
    // Retrieve a specific device group.
    return this.request(`/devicegroups/${id}`);
  }

  async updateDeviceGroup(id, data) {
    // Update a specific device group.
    return this.request(`/devicegroups/${id}`, 'PATCH', data);
  }

  async deleteDeviceGroup(id) {
    // Delete a specific device group.
    return this.request(`/devicegroups/${id}`, 'DELETE');
  }

  async getDeviceGroupAlerts(id, directAssignmentsOnly = false) {
    // Retrieve all alerts assigned to a specific device group.
    return this.request(`/devicegroups/${id}/alerts?direct_assignments_only=${directAssignmentsOnly}`);
  }

  async manageDeviceGroupAlerts(id, data) {
    // Assign and unassign alerts to a specific device group.
    return this.request(`/devicegroups/${id}/alerts`, 'POST', data);
  }

  async assignAlertToDeviceGroup(deviceGroupId, alertId) {
    // Assign an alert to a specific device group.
    return this.request(`/devicegroups/${deviceGroupId}/alerts/${alertId}`, 'POST');
  }

  async unassignAlertFromDeviceGroup(deviceGroupId, alertId) {
    // Unassign an alert from a specific device group.
    return this.request(`/devicegroups/${deviceGroupId}/alerts/${alertId}`, 'DELETE');
  }

  async getDeviceGroupDashboards(id) {
    // Retrieve all dashboards related to a specific device group.
    return this.request(`/devicegroups/${id}/dashboards`);
  }

  async getDeviceGroupDevices(id) {
    // Retrieve all devices in a specific device group.
    return this.request(`/devicegroups/${id}/devices`);
  }

  async getDeviceGroupTriggers(id) {
    // Retrieve all triggers assigned to a specific device group.
    return this.request(`/devicegroups/${id}/triggers`);
  }

  async manageDeviceGroupTriggers(id, data) {
    // Assign and unassign triggers to a specific device group.
    return this.request(`/devicegroups/${id}/triggers`, 'POST', data);
  }

  async assignTriggerToDeviceGroup(deviceGroupId, triggerId) {
    // Assign a trigger to a specific device group.
    return this.request(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`, 'POST');
  }

  async unassignTriggerFromDeviceGroup(deviceGroupId, triggerId) {
    // Unassign a trigger from a specific device group.
    return this.request(`/devicegroups/${deviceGroupId}/triggers/${triggerId}`, 'DELETE');
  }

  // Email Group methods
  async getAllEmailGroups() {
    // Retrieve all email groups.
    return this.request('/emailgroups');
  }

  async createEmailGroup(data) {
    // Create a new email group.
    return this.request('/emailgroups', 'POST', data);
  }

  async getEmailGroup(id) {
    // Retrieve a specific email group.
    return this.request(`/emailgroups/${id}`);
  }

  async updateEmailGroup(id, data) {
    // Update a specific email group.
    return this.request(`/emailgroups/${id}`, 'PATCH', data);
  }

  async deleteEmailGroup(id) {
    // Delete a specific email group.
    return this.request(`/emailgroups/${id}`, 'DELETE');
  }

  // Exclusion Interval methods
  async getAllExclusionIntervals() {
    // Retrieve all exclusion intervals.
    return this.request('/exclusionintervals');
  }

  async createExclusionInterval(data) {
    // Create a new exclusion interval.
    return this.request('/exclusionintervals', 'POST', data);
  }

  async getExclusionInterval(id) {
    // Retrieve a specific exclusion interval.
    return this.request(`/exclusionintervals/${id}`);
  }
  
  async updateExclusionInterval(id, data) {
    // Update a specific exclusion interval.
    return this.request(`/exclusionintervals/${id}`, 'PATCH', data);
  }

  async deleteExclusionInterval(id) {
    // Delete a specific exclusion interval.
    return this.request(`/exclusionintervals/${id}`, 'DELETE');
  }

  // ExtraHop methods
  async getExtrahopInfo() {
    // Retrieve metadata about the firmware running on the appliance.
    return this.request('/extrahop');
  }

  async getExtrahopIdrac() {
    // Retrieve the iDRAC IP address of the appliance.
    return this.request('/extrahop/idrac');
  }

  async getAllExtrahopProcesses() {
    // Retrieve a list of processes running on the appliance.
    return this.request('/extrahop/processes');
  }

  async restartExtrahopProcess(process) {
    // Restart a process running on the appliance.
    return this.request(`/extrahop/processes/${process}/restart`, 'POST');
  }

  async createExtrahopCloudResource(file) {
    // Manually update resources on the ExtraHop system.
    // These resources are automatically updated when the system is connected to ExtraHop Cloud Services.
    const formData = new FormData();
    formData.append('cloudresources', file);
    return this.request('/extrahop/cloudresources', 'POST', formData);
  }

  async getExtrahopDetectionsAccess() {
    // Retrieve the detections access control settings.
    return this.request('/extrahop/detections/access');
  }

  async updateExtrahopDetectionsAccess(data) {
    // Update detections access control settings.
    return this.request('/extrahop/detections/access', 'PUT', data);
  }

  async getExtrahopEdition() {
    // Retrieve the system edition of the appliance.
    return this.request('/extrahop/edition');
  }

  async getExtrahopFirmware() {
    // Retrieve information about firmware running on the appliance.
    return this.request('/extrahop/firmware');
  }

  async uploadExtrahopFirmware(file) {
    // Upload a new firmware image to the appliance.
    // Note: You cannot upload a firmware image through the REST API explorer.
    // For more information about how to upload an image through cURL or a Python script,
    // see [Upgrade ExtraHop firmware through the REST API](https://docs.extrahop.com/9.8/rest-upgrade-firmware/).
    const formData = new FormData();
    formData.append('firmware', file);
    return this.request('/extrahop/firmware', 'POST', formData);
  }

  async createExtrahopFirmwarePreviousRollback() {
    // Rollback to the previous firmware version.
    return this.request('/extrahop/firmware/previous/rollback', 'POST');
  }

  async getExtrahopPlatform() {
    // Retrieve the platform name of the appliance.
    return this.request('/extrahop/platform');
  }

  async createExtrahopRestart() {
    // Restart the appliance.
    return this.request('/extrahop/restart', 'POST');
  }

  async getExtrahopServices() {
    // Retrieve settings for all services.
    return this.request('/extrahop/services');
  }

  async updateExtrahopServices(data) {
    // Update the settings for services.
    return this.request('/extrahop/services', 'PATCH', data);
  }

  async createExtrahopShutdown() {
    // Shut down the appliance.
    return this.request('/extrahop/shutdown', 'POST');
  }

  async renewExtrahopSslCert() {
    // Regenerate the SSL certificate on the appliance.
    return this.request('/extrahop/sslcert', 'POST');
  }

  async replaceExtrahopSslCert(data) {
    // Replace the SSL certificate on the appliance.
    // The data should contain the SSL certificate and optionally the private key.
    // Enter as plain text, separated with a line break.
    return this.request('/extrahop/sslcert', 'PUT', data);
  }

  async getExtrahopTicketing() {
    // Retrieve information about the ticketing integration status.
    return this.request('/extrahop/ticketing');
  }

  async getExtrahopVersion() {
    // Retrieve the firmware version running on the appliance.
    return this.request('/extrahop/version');
  }

  // Investigations methods
  async getAllInvestigations() {
    // Retrieve all investigations.
    return this.request('/investigations');
  }

  async createInvestigation(data) {
    // Create an investigation.
    return this.request('/investigations', 'POST', data);
  }

  async getInvestigation(id) {
    // Retrieve a specific investigation.
    return this.request(`/investigations/${id}`);
  }

  async updateInvestigation(id, data) {
    // Update a specific investigation.
    return this.request(`/investigations/${id}`, 'PATCH', data);
  }

  async deleteInvestigation(id) {
    // Delete a specific investigation.
    return this.request(`/investigations/${id}`, 'DELETE');
  }

  async getInvestigationDetections(id) {
    // Retrieve all detections associated with a specific investigation.
    return this.request(`/investigations/${id}/detections`);
  }

  async updateInvestigationDetections(id, data) {
    // Update detections associated with a specific investigation.
    return this.request(`/investigations/${id}/detections`, 'PATCH', data);
  }

  async getInvestigationDevices(id) {
    // Retrieve all devices associated with a specific investigation.
    return this.request(`/investigations/${id}/devices`);
  }

  async updateInvestigationDevices(id, data) {
    // Update devices associated with a specific investigation.
    return this.request(`/investigations/${id}/devices`, 'PATCH', data);
  }

  async getInvestigationNotes(id) {
    // Retrieve notes for a specific investigation.
    return this.request(`/investigations/${id}/notes`);
  }

  async updateInvestigationNotes(id, data) {
    // Update notes for a specific investigation.
    return this.request(`/investigations/${id}/notes`, 'PUT', data);
  }

  async deleteInvestigationNotes(id) {
    // Delete notes for a specific investigation.
    return this.request(`/investigations/${id}/notes`, 'DELETE');
  }

  async getInvestigationTickets(id) {
    // Retrieve tickets associated with a specific investigation.
    return this.request(`/investigations/${id}/tickets`);
  }

  async updateInvestigationTickets(id, data) {
    // Update tickets associated with a specific investigation.
    return this.request(`/investigations/${id}/tickets`, 'PATCH', data);
  }

  // Jobs methods
  async getAllJobs() {
    // Retrieve all jobs.
    return this.request('/jobs');
  }

  async createJob(data) {
    // Create a new job.
    return this.request('/jobs', 'POST', data);
  }

  async getJob(id) {
    // Retrieve a specific job.
    return this.request(`/jobs/${id}`);
  }

  async deleteJob(id) {
    // Delete a specific job.
    return this.request(`/jobs/${id}`, 'DELETE');
  }

  async getJobResult(id) {
    // Retrieve the result of a specific job.
    return this.request(`/jobs/${id}/result`);
  }

  async getJobStatus(id) {
    // Retrieve the status of a specific job.
    return this.request(`/jobs/${id}/status`);
  }

  // License methods
  async getLicense() {
    // Retrieve license information.
    return this.request('/license');
  }

  async updateLicense(data) {
    // Update the license on the appliance.
    return this.request('/license', 'PUT', data);
  }

  async getLicenseProductKey() {
    // Retrieve the product key for the license.
    return this.request('/license/productkey');
  }

  // Metrics methods
  async getMetrics(params) {
    // Retrieve metric data.
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/metrics?${queryString}`);
  }

  async postMetricsQuery(data) {
    // Perform a metric query.
    // This endpoint allows for the creation of complex metric queries using JSON.
    // The response contains the requested metric data.
    return this.request('/metrics/next', 'POST', data);
  }

  async getMetricsNextPage(xid) {
    // Retrieve the next page of results for a metrics query.
    // The xid parameter is the unique identifier returned by the initial query.
    return this.request(`/metrics/next/${xid}`);
  }

  async getMetricsByObject(params) {
    // Retrieve metrics for a specific object.
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/metrics/objectsByProtocol?${queryString}`);
  }

  async getTotalByObject(params) {
    // Retrieve total metrics for a specific object.
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/metrics/totalsByObject?${queryString}`);
  }

  // Network methods
  async getAllNetworks() {
    // Retrieve all networks discovered by the ExtraHop system.
    return this.request('/networks');
  }

  async getNetwork(id) {
    // Retrieve a specific network by ID.
    return this.request(`/networks/${id}`);
  }

  async updateNetwork(id, data) {
    // Update a specific network.
    return this.request(`/networks/${id}`, 'PATCH', data);
  }

  async getNetworkAlerts(id, directAssignmentsOnly = false) {
    // Retrieve all alerts assigned to a specific network.
    return this.request(`/networks/${id}/alerts?direct_assignments_only=${directAssignmentsOnly}`);
  }

  async manageNetworkAlerts(id, data) {
    // Assign and unassign alerts to a specific network.
    return this.request(`/networks/${id}/alerts`, 'POST', data);
  }

  async assignAlertToNetwork(networkId, alertId) {
    // Assign an alert to a specific network.
    return this.request(`/networks/${networkId}/alerts/${alertId}`, 'POST');
  }

  async unassignAlertFromNetwork(networkId, alertId) {
    // Unassign an alert from a specific network.
    return this.request(`/networks/${networkId}/alerts/${alertId}`, 'DELETE');
  }

  async getNetworkVlans(id) {
    // Retrieve all VLAN IDs assigned to a specific network.
    return this.request(`/networks/${id}/vlans`);
  }

  // Network Locality methods
  async getAllNetworkLocalities() {
    // Retrieve all network localities.
    return this.request('/networklocalities');
  }

  async getNetworkLocality(id) {
    // Retrieve a specific network locality.
    return this.request(`/networklocalities/${id}`);
  }

  async createNetworkLocality(data) {
    // Create a new network locality entry.
    return this.request('/networklocalities', 'POST', data);
  }

  async updateNetworkLocality(id, data) {
    // Update a specific network locality entry.
    return this.request(`/networklocalities/${id}`, 'PATCH', data);
  }

  async deleteNetworkLocality(id) {
    // Delete a specific network locality entry.
    return this.request(`/networklocalities/${id}`, 'DELETE');
  }

  // Node methods
  async getAllNodes() {
    // Retrieve all nodes connected to this console.
    return this.request('/nodes');
  }

  async getNode(id) {
    // Retrieve a specific node.
    return this.request(`/nodes/${id}`);
  }

  async updateNode(id, data) {
    // Update a specific node.
    return this.request(`/nodes/${id}`, 'PATCH', data);
  }

  // Observations methods
  async createObservationsAssociatedIpAddrs(data) {
    // Create observations for associated IP addresses.
    return this.request('/observations/associatedipaddrs', 'POST', data);
  }

  // ODS Targets methods
  async getAllOdsTargets() {
    // Retrieve all ODS targets.
    return this.request('/odstargets');
  }

  async createOdsTarget(data) {
    // Create a new ODS target.
    return this.request('/odstargets', 'POST', data);
  }

  async getOdsTarget(id) {
    // Retrieve a specific ODS target.
    return this.request(`/odstargets/${id}`);
  }

  async updateOdsTarget(id, data) {
    // Update a specific ODS target.
    return this.request(`/odstargets/${id}`, 'PATCH', data);
  }

  async deleteOdsTarget(id) {
    // Delete a specific ODS target.
    return this.request(`/odstargets/${id}`, 'DELETE');
  }

  async getAllHttpTargets() {
    // Retrieve all HTTP ODS targets.
    return this.request('/odstargets/http');
  }

  async createHttpTarget(data) {
    // Create a new HTTP ODS target.
    return this.request('/odstargets/http', 'POST', data);
  }

  async getHttpTarget(name) {
    // Retrieve a specific HTTP ODS target.
    return this.request(`/odstargets/http/${name}`);
  }

  async updateHttpTarget(name, data) {
    // Update a specific HTTP ODS target.
    return this.request(`/odstargets/http/${name}`, 'PATCH', data);
  }

  async deleteHttpTarget(name) {
    // Delete a specific HTTP ODS target.
    return this.request(`/odstargets/http/${name}`, 'DELETE');
  }

  async getAllKafkaTargets() {
    // Retrieve all Kafka ODS targets.
    return this.request('/odstargets/kafka');
  }

  async createKafkaTarget(data) {
    // Create a new Kafka ODS target.
    return this.request('/odstargets/kafka', 'POST', data);
  }

  async getKafkaTarget(name) {
    // Retrieve a specific Kafka ODS target.
    return this.request(`/odstargets/kafka/${name}`);
  }

  async updateKafkaTarget(name, data) {
    // Update a specific Kafka ODS target.
    return this.request(`/odstargets/kafka/${name}`, 'PATCH', data);
  }

  async deleteKafkaTarget(name) {
    // Delete a specific Kafka ODS target.
    return this.request(`/odstargets/kafka/${name}`, 'DELETE');
  }

  async getAllMongodbTargets() {
    // Retrieve all MongoDB ODS targets.
    return this.request('/odstargets/mongodb');
  }

  async createMongodbTarget(data) {
    // Create a new MongoDB ODS target.
    return this.request('/odstargets/mongodb', 'POST', data);
  }

  async getMongodbTarget(name) {
    // Retrieve a specific MongoDB ODS target.
    return this.request(`/odstargets/mongodb/${name}`);
  }

  async updateMongodbTarget(name, data) {
    // Update a specific MongoDB ODS target.
    return this.request(`/odstargets/mongodb/${name}`, 'PATCH', data);
  }

  async deleteMongodbTarget(name) {
    // Delete a specific MongoDB ODS target.
    return this.request(`/odstargets/mongodb/${name}`, 'DELETE');
  }

  async getAllRawTargets() {
    // Retrieve all raw ODS targets.
    return this.request('/odstargets/raw');
  }

  async createRawTarget(data) {
    // Create a new raw ODS target.
    return this.request('/odstargets/raw', 'POST', data);
  }

  async getRawTarget(name) {
    // Retrieve a specific raw ODS target.
    return this.request(`/odstargets/raw/${name}`);
  }

  async updateRawTarget(name, data) {
    // Update a specific raw ODS target.
    return this.request(`/odstargets/raw/${name}`, 'PATCH', data);
  }

  async deleteRawTarget(name) {
    // Delete a specific raw ODS target.
    return this.request(`/odstargets/raw/${name}`, 'DELETE');
  }

  async getAllSyslogTargets() {
    // Retrieve all syslog ODS targets.
    return this.request('/odstargets/syslog');
  }

  async createSyslogTarget(data) {
    // Create a new syslog ODS target.
    return this.request('/odstargets/syslog', 'POST', data);
  }

  async getSyslogTarget(name) {
    // Retrieve a specific syslog ODS target.
    return this.request(`/odstargets/syslog/${name}`);
  }

  async updateSyslogTarget(name, data) {
    // Update a specific syslog ODS target.
    return this.request(`/odstargets/syslog/${name}`, 'PATCH', data);
  }

  async deleteSyslogTarget(name) {
    // Delete a specific syslog ODS target.
    return this.request(`/odstargets/syslog/${name}`, 'DELETE');
  }

  // Packets methods
  async getPackets(params) {
    // Retrieve packets from the ExtraHop trace store.
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/packets?${queryString}`);
  }

  async createPacketSearch(data) {
    // Create a new packet search.
    return this.request('/packets/search', 'POST', data);
  }

  async getPacketSearch(id) {
    // Retrieve information about a specific packet search.
    return this.request(`/packets/search/${id}`);
  }

  async deletePacketSearch(id) {
    // Delete a specific packet search.
    return this.request(`/packets/search/${id}`, 'DELETE');
  }

  // Pairing methods
  async createPairingToken() {
    // Generate a token required to connect a sensor to a console or connect an EXA 5300 recordstore to a sensor or console.
    return this.request('/pairing/token', 'POST');
  }

  // Records methods
  async getRecordsCursor(cursor, contextTtl) {
    // Deprecated. Retrieve records starting at a specified cursor.
    const params = new URLSearchParams();
    if (contextTtl) {
      params.append('context_ttl', contextTtl);
    }
    return this.request(`/records/cursor/${cursor}?${params.toString()}`);
  }

  async fetchRecordsCursor(data) {
    // Retrieve records starting at a specified cursor.
    return this.request('/records/cursor', 'POST', data);
  }

  async searchRecords(data) {
    // Perform a record log query.
    return this.request('/records/search', 'POST', data);
  }
  
  async getRecordFormats() {
    // Retrieve all record formats.
    return this.request('/records/formats');
  }

  async createRecordFormat(data) {
    // Create a new custom record format.
    return this.request('/records/formats', 'POST', data);
  }

  async getRecordFormat(id) {
    // Retrieve a specific record format.
    return this.request(`/records/formats/${id}`);
  }

  async updateRecordFormat(id, data) {
    // Update a specific custom record format.
    return this.request(`/records/formats/${id}`, 'PATCH', data);
  }

  async deleteRecordFormat(id) {
    // Delete a specific custom record format.
    return this.request(`/records/formats/${id}`, 'DELETE');
  }

  // Running Config methods
  async getRunningConfig() {
    // Retrieve the running configuration of the appliance.
    return this.request('/runningconfig');
  }

  async updateRunningConfig(data) {
    // Update the running configuration of the appliance.
    return this.request('/runningconfig', 'PUT', data);
  }

  async getRunningConfigSaved() {
    // Retrieve the saved running configuration.
    return this.request('/runningconfig/saved');
  }

  async saveRunningConfig() {
    // Save the current running configuration.
    return this.request('/runningconfig/save', 'POST');
  }

  async revertRunningConfig() {
    // Revert the running configuration to the previous saved version.
    return this.request('/runningconfig/saved/previous', 'POST');
  }

  // Software methods
  async getSoftware() {
    // Retrieve software information.
    return this.request('/software');
  }

  async updateSoftware(data) {
    // Update the software on the appliance.
    return this.request('/software', 'POST', data);
  }

  async getSoftwareHistory() {
    // Retrieve the software update history.
    return this.request('/software/history');
  }

  async getSoftwareJobStatus(jobId) {
    // Retrieve the status of a specific software update job.
    return this.request(`/software/jobs/${jobId}`);
  }

  async getSoftwareNextUpdate() {
    // Retrieve information about the next available software update.
    return this.request('/software/next');
  }

  async getSoftwareProgress() {
    // Retrieve the progress of a software update.
    return this.request('/software/progress');
  }

  async getSoftwareStatus() {
    // Retrieve the status of a software update.
    return this.request('/software/status');
  }

  // SSL Decrypt Keys methods
  async getAllSslDecryptKeys() {
    // Retrieve all SSL decrypt keys.
    return this.request('/ssldecryptkeys');
  }

  async createSslDecryptKey(data) {
    // Create a new SSL decrypt key.
    return this.request('/ssldecryptkeys', 'POST', data);
  }

  async getSslDecryptKey(id) {
    // Retrieve a specific SSL decrypt key.
    return this.request(`/ssldecryptkeys/${id}`);
  }

  async updateSslDecryptKey(id, data) {
    // Update a specific SSL decrypt key.
    return this.request(`/ssldecryptkeys/${id}`, 'PATCH', data);
  }

  async deleteSslDecryptKey(id) {
    // Delete a specific SSL decrypt key.
    return this.request(`/ssldecryptkeys/${id}`, 'DELETE');
  }


  // Support Pack methods
  async getAllSupportPacks() {
    // Retrieve metadata about all support packs.
    return this.request('/supportpacks');
  }

  async uploadAndRunSupportPack(file) {
    // Upload and run a support pack.
    const formData = new FormData();
    formData.append('file', file);
    return this.request('/supportpacks', 'POST', formData);
  }

  async runDefaultSupportPack() {
    // Run the default support pack.
    return this.request('/supportpacks/execute', 'POST');
  }

  async getSupportPackStatus(id) {
    // Check on the status of an in-progress, running support pack.
    return this.request(`/supportpacks/queue/${id}`);
  }

  async downloadSupportPack(filename) {
    // Download an existing support pack by filename.
    return this.request(`/supportpacks/${filename}`);
  }

  // Tag methods
  async getAllTags() {
    // Retrieve all tags.
    return this.request('/tags');
  }

  async createTag(data) {
    // Create a new tag.
    return this.request('/tags', 'POST', data);
  }

  async getTag(id) {
    // Retrieve a specific tag.
    return this.request(`/tags/${id}`);
  }

  async updateTag(id, data) {
    // Update a specific tag.
    return this.request(`/tags/${id}`, 'PATCH', data);
  }

  async deleteTag(id) {
    // Delete a specific tag.
    return this.request(`/tags/${id}`, 'DELETE');
  }

  async getTaggedDevices(id) {
    // Retrieve all devices that are assigned a specific tag.
    return this.request(`/tags/${id}/devices`);
  }

  async manageTaggedDevices(id, data) {
    // Assign and unassign a specific tag to devices.
    return this.request(`/tags/${id}/devices`, 'POST', data);
  }

  async assignTagToDevice(tagId, deviceId) {
    // Assign a tag to a specific device.
    return this.request(`/tags/${tagId}/devices/${deviceId}`, 'POST');
  }

  async unassignTagFromDevice(tagId, deviceId) {
    // Unassign a tag from a specific device.
    return this.request(`/tags/${tagId}/devices/${deviceId}`, 'DELETE');
  }

  // Threat Collection methods
  async getAllThreatCollections() {
    // Retrieve all threat collections.
    return this.request('/threatcollections');
  }

  async createThreatCollection(data) {
    // Create a new threat collection.
    return this.request('/threatcollections', 'POST', data);
  }

  async getThreatCollection(id) {
    // Retrieve a specific threat collection.
    return this.request(`/threatcollections/${id}`);
  }

  async updateThreatCollection(id, data) {
    // Update a specific threat collection.
    return this.request(`/threatcollections/${id}`, 'PATCH', data);
  }

  async deleteThreatCollection(id) {
    // Delete a specific threat collection.
    return this.request(`/threatcollections/${id}`, 'DELETE');
  }

  async getThreatCollectionObservables(id) {
    // Retrieve observables for a specific threat collection.
    return this.request(`/threatcollections/${id}/observables`);
  }

  async updateThreatCollectionObservables(id, data) {
    // Update observables for a specific threat collection.
    return this.request(`/threatcollections/${id}/observables`, 'PUT', data);
  }
  
  // Trigger methods
  async getAllTriggers() {
    // Retrieve all triggers.
    return this.request('/triggers');
  }

  async createTrigger(data) {
    // Create a new trigger.
    return this.request('/triggers', 'POST', data);
  }

  async executeExternalDataTriggers(data) {
    // Execute EXTERNAL_DATA event triggers.
    return this.request('/triggers/externaldata', 'POST', data);
  }

  async getTrigger(id) {
    // Retrieve a specific trigger by unique identifier.
    return this.request(`/triggers/${id}`);
  }

  async updateTrigger(id, data) {
    // Update a specific trigger.
    return this.request(`/triggers/${id}`, 'PATCH', data);
  }

  async deleteTrigger(id) {
    // Delete a specific trigger.
    return this.request(`/triggers/${id}`, 'DELETE');
  }

  async getTriggerDeviceGroups(id) {
    // Retrieve all device groups that are assigned to a specific trigger.
    return this.request(`/triggers/${id}/devicegroups`);
  }

  async manageTriggerDeviceGroups(id, data) {
    // Assign and unassign a specific trigger to device groups.
    return this.request(`/triggers/${id}/devicegroups`, 'POST', data);
  }

  async assignTriggerToDeviceGroup(triggerId, deviceGroupId) {
    // Assign a trigger to a specific device group.
    return this.request(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`, 'POST');
  }

  async unassignTriggerFromDeviceGroup(triggerId, deviceGroupId) {
    // Unassign a trigger from a specific device group.
    return this.request(`/triggers/${triggerId}/devicegroups/${deviceGroupId}`, 'DELETE');
  }

  async getTriggerDevices(id) {
    // Retrieve all devices that are assigned to a specific trigger.
    return this.request(`/triggers/${id}/devices`);
  }

  async manageTriggerDevices(id, data) {
    // Assign and unassign a specific trigger to devices.
    return this.request(`/triggers/${id}/devices`, 'POST', data);
  }

  async assignTriggerToDevice(triggerId, deviceId) {
    // Assign a trigger to a specific device.
    return this.request(`/triggers/${triggerId}/devices/${deviceId}`, 'POST');
  }

  async unassignTriggerFromDevice(triggerId, deviceId) {
    // Unassign a trigger from a specific device.
    return this.request(`/triggers/${triggerId}/devices/${deviceId}`, 'DELETE');
  }

  // User group methods
  async getAllUserGroups() {
    // Retrieve all user groups.
    return this.request('/usergroups');
  }

  async createUserGroup(data) {
    // Create a new user group.
    return this.request('/usergroups', 'POST', data);
  }

  async refreshAllUserGroups() {
    // Query LDAP for the most recent user memberships for all remote user groups.
    return this.request('/usergroups/refresh', 'POST');
  }

  async getUserGroup(id) {
    // Retrieve a specific user group.
    return this.request(`/usergroups/${id}`);
  }

  async updateUserGroup(id, data) {
    // Update a specific user group.
    return this.request(`/usergroups/${id}`, 'PATCH', data);
  }

  async deleteUserGroup(id) {
    // Delete a specific user group.
    return this.request(`/usergroups/${id}`, 'DELETE');
  }

  async deleteUserGroupAssociations(id) {
    // Delete all dashboard sharing associations with a specific user group.
    return this.request(`/usergroups/${id}/associations`, 'DELETE');
  }

  async getUserGroupMembers(id) {
    // Retrieve all members of a specific user group.
    return this.request(`/usergroups/${id}/members`);
  }

  async updateUserGroupMembers(id, data) {
    // Assign or unassign users to a user group.
    return this.request(`/usergroups/${id}/members`, 'PATCH', data);
  }

  async replaceUserGroupMembers(id, data) {
    // Replace all the users assigned to the user group.
    return this.request(`/usergroups/${id}/members`, 'PUT', data);
  }

  async refreshUserGroup(id) {
    // Query LDAP for the most recent user membership of a specific remote user group.
    return this.request(`/usergroups/${id}/refresh`, 'POST');
  }

  // User methods
  async getAllUsers() {
    // Retrieve all users.
    return this.request('/users');
  }

  async createUser(data) {
    // Create a new user account.
    return this.request('/users', 'POST', data);
  }

  async getUser(username) {
    // Retrieve a specific user.
    return this.request(`/users/${username}`);
  }

  async updateUser(username, data) {
    // Update a specific user.
    return this.request(`/users/${username}`, 'PATCH', data);
  }

  async deleteUser(username) {
    // Delete a specific user.
    return this.request(`/users/${username}`, 'DELETE');
  }

  async getUserApiKeys(username) {
    // Retrieve all API keys for a specific user.
    return this.request(`/users/${username}/apikeys`);
  }

  async createUserApiKey(username) {
    // Create a new API key for a specific user.
    return this.request(`/users/${username}/apikeys`, 'POST');
  }

  async deleteUserApiKey(username, keyid) {
    // Delete a specific API key for a user.
    return this.request(`/users/${username}/apikeys/${keyid}`, 'DELETE');
  }

  async getUserGroups(username) {
    // Retrieve all user groups that a specific user is a member of.
    return this.request(`/users/${username}/groups`);
  }

  async getUserPreferences(username) {
    // Retrieve preferences for a specific user.
    return this.request(`/users/${username}/preferences`);
  }

  async updateUserPreferences(username, data) {
    // Update preferences for a specific user.
    return this.request(`/users/${username}/preferences`, 'PATCH', data);
  }

  async getUserLanguage(username) {
    // Retrieve the language preference for a specific user.
    return this.request(`/users/${username}/preferences/language`);
  }

  async updateUserLanguage(username, data) {
    // Update the language preference for a specific user.
    return this.request(`/users/${username}/preferences/language`, 'PATCH', data);
  }
  
  // VLAN methods
  async getAllVlans() {
    // Retrieve all VLANs.
    return this.request('/vlans');
  }

  async getVlan(id) {
    // Retrieve a specific VLAN.
    return this.request(`/vlans/${id}`);
  }

  async updateVlan(id, data) {
    // Update a specific VLAN.
    return this.request(`/vlans/${id}`, 'PATCH', data);
  }

  // Watchlist methods
  async removeDeviceFromWatchlist(id) {
    // Remove a device from the watchlist.
    return this.request(`/watchlist/device/${id}`, 'DELETE');
  }

  async addDeviceToWatchlist(id) {
    // Add a device to the watchlist.
    return this.request(`/watchlist/device/${id}`, 'POST');
  }

  async getWatchlist() {
    // Retrieve the list of devices in the watchlist.
    return this.request('/watchlist/devices');
  }

  async updateWatchlist(data) {
    // Update the list of devices in the watchlist.
    return this.request('/watchlist/devices', 'POST', data);
  }
}

export default ExtrahopApi;