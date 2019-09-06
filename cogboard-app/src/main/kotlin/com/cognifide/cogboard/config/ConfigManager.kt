package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.docker.VolumeStorage
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.util.*

class ConfigManager : AbstractVerticle() {

    private val widgets = mutableMapOf<String, Widget>()
    private lateinit var storage: Storage
    private lateinit var endpoints: JsonArray
    private lateinit var credentials: JsonArray
    private lateinit var endpoint: Endpoint;

    override fun start() {
        endpoints = config().getJsonArray(ENDPOINTS)
        credentials = config().getJsonArray(CREDENTIALS)
        endpoint = Endpoint(endpoints, credentials)
        storage = VolumeStorage(vertx)
        listenOnConfigSave()
        listenOnWidgetUpdate()
        loadConfig()
    }

    private fun listenOnConfigSave() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_CONFIG_SAVE)
            .handler { storage.saveConfig(it.body()) }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { createOrUpdate(it.body()) }

    private fun loadConfig() = storage
            .loadConfig()
            .getJsonObject(CogboardConstants.PROP_WIDGETS)
            .getJsonObject(CogboardConstants.PROP_WIDGETS_BY_ID)
            .forEach {
                createOrUpdate(JsonObject(it.value.toString()))
            }

    private fun createOrUpdate(config: JsonObject) {
        var newConfig = config
        val id = config.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets[id]?.let {
                it.stop()
                newConfig = it.config().mergeIn(config, true)
            }
            attachEndpoint(newConfig)
            widgets[id] = WidgetIndex.create(newConfig, vertx).start()
        } else {
            LOGGER.error("There is widget with no ID in configuration: $config")
        }
    }

    private fun attachEndpoint(config: JsonObject) {
        val endpointId = config.getString(CogboardConstants.PROP_ENDPOINT)
        endpointId?.let {
            config.put(CogboardConstants.PROP_ENDPOINT, endpoint.readById(endpointId))}
        }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(ConfigManager::class.java)
        const val CREDENTIALS = "credentials"
        const val ENDPOINTS = "endpoints"
    }
}