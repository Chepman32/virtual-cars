/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createAuction } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function AuctionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    make: "",
    model: "",
    year: "",
    carId: "",
    currentBid: "",
    endTime: "",
    status: "",
    lastBidPlayer: "",
    player: "",
    buy: "",
    minBid: "",
    type: "",
    bidded: [],
  };
  const [make, setMake] = React.useState(initialValues.make);
  const [model, setModel] = React.useState(initialValues.model);
  const [year, setYear] = React.useState(initialValues.year);
  const [carId, setCarId] = React.useState(initialValues.carId);
  const [currentBid, setCurrentBid] = React.useState(initialValues.currentBid);
  const [endTime, setEndTime] = React.useState(initialValues.endTime);
  const [status, setStatus] = React.useState(initialValues.status);
  const [lastBidPlayer, setLastBidPlayer] = React.useState(
    initialValues.lastBidPlayer
  );
  const [player, setPlayer] = React.useState(initialValues.player);
  const [buy, setBuy] = React.useState(initialValues.buy);
  const [minBid, setMinBid] = React.useState(initialValues.minBid);
  const [type, setType] = React.useState(initialValues.type);
  const [bidded, setBidded] = React.useState(initialValues.bidded);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMake(initialValues.make);
    setModel(initialValues.model);
    setYear(initialValues.year);
    setCarId(initialValues.carId);
    setCurrentBid(initialValues.currentBid);
    setEndTime(initialValues.endTime);
    setStatus(initialValues.status);
    setLastBidPlayer(initialValues.lastBidPlayer);
    setPlayer(initialValues.player);
    setBuy(initialValues.buy);
    setMinBid(initialValues.minBid);
    setType(initialValues.type);
    setBidded(initialValues.bidded);
    setCurrentBiddedValue("");
    setErrors({});
  };
  const [currentBiddedValue, setCurrentBiddedValue] = React.useState("");
  const biddedRef = React.createRef();
  const validations = {
    make: [{ type: "Required" }],
    model: [{ type: "Required" }],
    year: [],
    carId: [],
    currentBid: [],
    endTime: [{ type: "Required" }],
    status: [{ type: "Required" }],
    lastBidPlayer: [],
    player: [{ type: "Required" }],
    buy: [{ type: "Required" }],
    minBid: [{ type: "Required" }],
    type: [{ type: "Required" }],
    bidded: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          make,
          model,
          year,
          carId,
          currentBid,
          endTime,
          status,
          lastBidPlayer,
          player,
          buy,
          minBid,
          type,
          bidded,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createAuction.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AuctionCreateForm")}
      {...rest}
    >
      <TextField
        label="Make"
        isRequired={true}
        isReadOnly={false}
        value={make}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make: value,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.make ?? value;
          }
          if (errors.make?.hasError) {
            runValidationTasks("make", value);
          }
          setMake(value);
        }}
        onBlur={() => runValidationTasks("make", make)}
        errorMessage={errors.make?.errorMessage}
        hasError={errors.make?.hasError}
        {...getOverrideProps(overrides, "make")}
      ></TextField>
      <TextField
        label="Model"
        isRequired={true}
        isReadOnly={false}
        value={model}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make,
              model: value,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.model ?? value;
          }
          if (errors.model?.hasError) {
            runValidationTasks("model", value);
          }
          setModel(value);
        }}
        onBlur={() => runValidationTasks("model", model)}
        errorMessage={errors.model?.errorMessage}
        hasError={errors.model?.hasError}
        {...getOverrideProps(overrides, "model")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={year}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              make,
              model,
              year: value,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Car id"
        isRequired={false}
        isReadOnly={false}
        value={carId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId: value,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.carId ?? value;
          }
          if (errors.carId?.hasError) {
            runValidationTasks("carId", value);
          }
          setCarId(value);
        }}
        onBlur={() => runValidationTasks("carId", carId)}
        errorMessage={errors.carId?.errorMessage}
        hasError={errors.carId?.hasError}
        {...getOverrideProps(overrides, "carId")}
      ></TextField>
      <TextField
        label="Current bid"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={currentBid}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid: value,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.currentBid ?? value;
          }
          if (errors.currentBid?.hasError) {
            runValidationTasks("currentBid", value);
          }
          setCurrentBid(value);
        }}
        onBlur={() => runValidationTasks("currentBid", currentBid)}
        errorMessage={errors.currentBid?.errorMessage}
        hasError={errors.currentBid?.hasError}
        {...getOverrideProps(overrides, "currentBid")}
      ></TextField>
      <TextField
        label="End time"
        isRequired={true}
        isReadOnly={false}
        value={endTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime: value,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.endTime ?? value;
          }
          if (errors.endTime?.hasError) {
            runValidationTasks("endTime", value);
          }
          setEndTime(value);
        }}
        onBlur={() => runValidationTasks("endTime", endTime)}
        errorMessage={errors.endTime?.errorMessage}
        hasError={errors.endTime?.hasError}
        {...getOverrideProps(overrides, "endTime")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={true}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status: value,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Last bid player"
        isRequired={false}
        isReadOnly={false}
        value={lastBidPlayer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer: value,
              player,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.lastBidPlayer ?? value;
          }
          if (errors.lastBidPlayer?.hasError) {
            runValidationTasks("lastBidPlayer", value);
          }
          setLastBidPlayer(value);
        }}
        onBlur={() => runValidationTasks("lastBidPlayer", lastBidPlayer)}
        errorMessage={errors.lastBidPlayer?.errorMessage}
        hasError={errors.lastBidPlayer?.hasError}
        {...getOverrideProps(overrides, "lastBidPlayer")}
      ></TextField>
      <TextField
        label="Player"
        isRequired={true}
        isReadOnly={false}
        value={player}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player: value,
              buy,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.player ?? value;
          }
          if (errors.player?.hasError) {
            runValidationTasks("player", value);
          }
          setPlayer(value);
        }}
        onBlur={() => runValidationTasks("player", player)}
        errorMessage={errors.player?.errorMessage}
        hasError={errors.player?.hasError}
        {...getOverrideProps(overrides, "player")}
      ></TextField>
      <TextField
        label="Buy"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={buy}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy: value,
              minBid,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.buy ?? value;
          }
          if (errors.buy?.hasError) {
            runValidationTasks("buy", value);
          }
          setBuy(value);
        }}
        onBlur={() => runValidationTasks("buy", buy)}
        errorMessage={errors.buy?.errorMessage}
        hasError={errors.buy?.hasError}
        {...getOverrideProps(overrides, "buy")}
      ></TextField>
      <TextField
        label="Min bid"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={minBid}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid: value,
              type,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.minBid ?? value;
          }
          if (errors.minBid?.hasError) {
            runValidationTasks("minBid", value);
          }
          setMinBid(value);
        }}
        onBlur={() => runValidationTasks("minBid", minBid)}
        errorMessage={errors.minBid?.errorMessage}
        hasError={errors.minBid?.hasError}
        {...getOverrideProps(overrides, "minBid")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type: value,
              bidded,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              make,
              model,
              year,
              carId,
              currentBid,
              endTime,
              status,
              lastBidPlayer,
              player,
              buy,
              minBid,
              type,
              bidded: values,
            };
            const result = onChange(modelFields);
            values = result?.bidded ?? values;
          }
          setBidded(values);
          setCurrentBiddedValue("");
        }}
        currentFieldValue={currentBiddedValue}
        label={"Bidded"}
        items={bidded}
        hasError={errors?.bidded?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bidded", currentBiddedValue)
        }
        errorMessage={errors?.bidded?.errorMessage}
        setFieldValue={setCurrentBiddedValue}
        inputFieldRef={biddedRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Bidded"
          isRequired={false}
          isReadOnly={false}
          value={currentBiddedValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bidded?.hasError) {
              runValidationTasks("bidded", value);
            }
            setCurrentBiddedValue(value);
          }}
          onBlur={() => runValidationTasks("bidded", currentBiddedValue)}
          errorMessage={errors.bidded?.errorMessage}
          hasError={errors.bidded?.hasError}
          ref={biddedRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bidded")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
