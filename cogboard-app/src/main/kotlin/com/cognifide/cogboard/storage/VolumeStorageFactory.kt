package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.ConfigFactory
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator

object VolumeStorageFactory {
    fun boards(): VolumeStorage {
        val config = ConfigFactory.getByType(ConfigType.BOARDS)
        return VolumeStorage(ConfigType.BOARDS, config.filePath(), BoardsValidator)
    }

    fun credentials(): VolumeStorage {
        val config = ConfigFactory.getByType(ConfigType.CREDENTIALS)
        return VolumeStorage(ConfigType.CREDENTIALS, config.filePath(), CredentialsValidator)
    }

    fun endpoints(): VolumeStorage {
        val config = ConfigFactory.getByType(ConfigType.ENDPOINTS)
        return VolumeStorage(ConfigType.ENDPOINTS, config.filePath(), EndpointsValidator)
    }
}
